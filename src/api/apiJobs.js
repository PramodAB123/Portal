import supabaseClient from "../utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, company:companies(name, logo), savedjob:savedjobs(id, job_id)");

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
        const { data, error } = await supabase.from("savedjobs").delete().eq("id", alreadySaved.id).select();
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
