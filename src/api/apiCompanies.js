import supabaseClient from "../utils/supabase";


export async function getcompanies(token, { searchQuery, location }) {
    const supabase = await supabaseClient(token);

    let query = supabase.from("companies").select("*");

    if (location) {
        query = query.eq("location", location)
    }
    if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`)
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching jobs:", error)
        throw error
    }
    return data;
}