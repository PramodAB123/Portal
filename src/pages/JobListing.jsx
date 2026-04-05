import { useSession } from '@clerk/react'
import React, { useEffect } from 'react'
import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/UseFetch';
const JobListing = () => {
    const { session } = useSession();

    const fetchData = async () => {
        useFetch(getJobs)
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>JobListing</div>
    )
}

export default JobListing
