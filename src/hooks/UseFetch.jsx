import { useSession } from "@clerk/react";

const useFetch = (callback, options = {}) => {
    const { session } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const token = await session?.getToken({
                template: "supabase"
            });
            const response = await callback(token, options, ...args)
            setData(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    return { data, loading, error, fn }
}
export default useFetch;