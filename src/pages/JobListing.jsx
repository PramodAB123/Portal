import { useSession, useUser } from '@clerk/react'
import React, { useEffect, useState } from 'react'
import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/UseFetch';
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/JobCard';
const JobListing = () => {
    const { isLoaded } = useUser();
    const [location, setLocation] = useState("")
    const [company_id, setCompany_id] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const { data: dataJobs, loading: loadingJobs, error: errorJobs, fn: fnJobs } = useFetch(getJobs, { location, company_id, searchQuery })

    console.log("dataJobs:", dataJobs);
    if (errorJobs) {
        console.error("errorJobs:", errorJobs);
    }

    useEffect(() => {
        if (isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, company_id, searchQuery])
    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }
    return (
        <>
            <h1 className='font-bold text-7xl text-center mb-8 pb-8'>Latest Jobs</h1>
            {loadingJobs && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}
            {errorJobs && <p className='text-red-500 text-center'>Error fetching jobs</p>}
            {dataJobs?.length === 0 && <p className='text-center'>No jobs found</p>}
            {dataJobs?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 pb-12">
                    {dataJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}

        </>
    )
}

export default JobListing
