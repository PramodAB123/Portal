import { useSession, useUser } from '@clerk/react'
import React, { useEffect, useState } from 'react'
import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/UseFetch';
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { getcompanies } from '@/api/apiCompanies';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select';
const JobListing = () => {
    const { isLoaded } = useUser();
    const [location, setLocation] = useState("")
    const [company_id, setCompany_id] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const { data: dataJobs, loading: loadingJobs, error: errorJobs, fn: fnJobs } = useFetch(getJobs, { location, company_id, searchQuery })
    const { data: companies, fn: fnCompanies } = useFetch(getcompanies, { searchQuery, location })

    useEffect(() => {
        if (isLoaded) fnCompanies();
    }, [isLoaded])
    console.log("dataJobs:", companies);
    if (errorJobs) {
        console.error("errorJobs:", errorJobs);
    }

    useEffect(() => {
        if (isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, company_id, searchQuery])
    const handleSearch = (e) => {
        e.preventDefault()
        let formData = new FormData(e.target);
        const query = formData.get("query") || ""
        setSearchQuery(query)
    }

    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }
    return (
        <>
            <h1 className='font-bold text-7xl text-center mb-8 pb-8'>Latest Jobs</h1>
            {loadingJobs && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}
            <div className='flex items-center gap-3 max-w-4xl mx-auto px-4 mb-10'>
                <form
                    action=""
                    onSubmit={handleSearch}
                    className="flex items-center gap-3 flex-1"
                >
                    <Input
                        placeholder="Search by location..."
                        name="query"
                        className="h-11 flex-1 rounded-xl border-border bg-card text-base px-4 shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <button
                        type="submit"
                        className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm shrink-0"
                    >
                        Search
                    </button>
                </form>
                <Select value={location} onValueChange={(value) => { setLocation(value) }}>
                    <SelectTrigger className="h-11 w-[180px] rounded-xl shrink-0">
                        <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Banglore">Banglore</SelectItem>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={company_id} onValueChange={(value) => { setCompany_id(value) }}>
                    <SelectTrigger className="h-11 w-[180px] rounded-xl shrink-0">
                        <SelectValue placeholder="Filter by company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {companies?.map((company) => (
                                <SelectItem key={company.id} value={company.id}>
                                    {company.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {errorJobs && <p className='text-red-500 text-center'>Error fetching jobs</p>}
            {dataJobs?.length === 0 && <p className='text-center'>No jobs found</p>}
            {dataJobs?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-12 pb-12">
                    {dataJobs.map((job) => (
                        <JobCard key={job.id} job={job} savedInit={job?.savedjob?.length > 0} />
                    ))}
                </div>
            )}

        </>
    )
}

export default JobListing
