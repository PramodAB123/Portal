import supabaseClient from "../utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery, user_id }) {
    const supabase = await supabaseClient(token);

    // Use a column filter inside the relation to only return THIS user's savedjobs row.
    // The `user_id=eq.${user_id}` syntax is a Supabase embedded filter — it's a left join
    // so jobs without a matching savedjobs row still appear (savedjob = []).
    const savedSelect = user_id
        ? `savedjob:savedjobs(id, job_id, user_id).user_id=eq.${user_id}`
        : `savedjob:savedjobs(id, job_id)`;
    let query = supabase.from("jobs").select(`*, company:companies(name, logo), ${savedSelect}`);


    if (location) {
        query = query.eq("location", location)
    }
    if (company_id) {
        query = query.eq("company_id", company_id)
    }
    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`)
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching jobs:", error)
        throw error
    }
    return data;
}

export async function saveJob(token, { alreadySaved, saveData }) {
    const supabase = await supabaseClient(token);
    if (alreadySaved) {
        // Match both id and user_id so Supabase RLS policies never block the delete
        let deleteQuery = supabase.from("savedjobs").delete().eq("id", alreadySaved.id);
        if (saveData?.user_id) {
            deleteQuery = deleteQuery.eq("user_id", saveData.user_id);
        }
        const { data, error } = await deleteQuery.select();
        if (error) {
            console.error("Error removing saved job:", error);
            return { error };
        }
        return { data: null, success: true };
    }

    const { data: savedJob, error: saveError } = await supabase.from("savedjobs").insert([saveData]).select().single();
    if (saveError) {
        console.error("Error saving job:", saveError);
        return { error: saveError };
    }
    return { data: savedJob, success: true };
}
