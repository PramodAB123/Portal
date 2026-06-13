import { useUser } from '@clerk/react'
import React, { useEffect, useState } from 'react'
import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/UseFetch';
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { getcompanies } from '@/api/apiCompanies';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from '@/components/ui/select';
import { Search, MapPin, Building2, X, Briefcase } from 'lucide-react';

const LOCATIONS = ["Delhi", "Bangalore", "Mumbai", "Hyderabad", "Chennai", "Pune", "Kolkata"];

const JobListing = () => {
    const { isLoaded, user } = useUser();
    const [location, setLocation] = useState("")
    const [company_id, setCompany_id] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [inputValue, setInputValue] = useState("")

    const { data: dataJobs, loading: loadingJobs, error: errorJobs, fn: fnJobs } =
        useFetch(getJobs, { location, company_id, searchQuery, user_id: user?.id })
    const { data: companies, fn: fnCompanies } =
        useFetch(getcompanies, {})

    useEffect(() => {
        if (isLoaded) fnCompanies();
    }, [isLoaded])

    useEffect(() => {
        if (isLoaded && user) fnJobs();
    }, [isLoaded, user, location, company_id, searchQuery])

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(inputValue.trim())
    }

    const clearLocation = () => setLocation("")
    const clearCompany = () => setCompany_id("")
    const clearSearch = () => { setSearchQuery(""); setInputValue("") }

    const activeFilters = [
        location && { label: location, onRemove: clearLocation },
        company_id && { label: companies?.find(c => c.id === company_id)?.name || "Company", onRemove: clearCompany },
        searchQuery && { label: `"${searchQuery}"`, onRemove: clearSearch },
    ].filter(Boolean)

    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='#6366f1' />
    }

    return (
        <div className="min-h-screen">
            {/* ── Hero Section ── */}
            <section className="relative overflow-hidden py-16 px-4">
                {/* gradient orbs */}
                <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative max-w-3xl mx-auto text-center space-y-4">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium">
                        <Briefcase size={14} />
                        Opportunities await
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent leading-tight">
                        Find Your Next<br />
                        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            Dream Job
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Browse thousands of curated job listings from top companies across India.
                    </p>
                </div>
            </section>

            {/* ── Filters Bar ── */}
            <section className="sticky top-0 z-20 px-4 pb-4">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-xl p-3 flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2 flex-1 bg-muted/40 rounded-xl px-3 border border-border/40 focus-within:border-indigo-500/60 transition-colors"
                        >
                            <Search size={16} className="text-muted-foreground shrink-0" />
                            <input
                                placeholder="Search jobs, skills, keywords…"
                                name="query"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                            />
                            {inputValue && (
                                <button type="button" onClick={() => setInputValue("")}>
                                    <X size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
                                </button>
                            )}
                        </form>

                        {/* Location filter */}
                        <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="h-10 w-full sm:w-44 rounded-xl border-border/40 bg-muted/40 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-muted-foreground shrink-0" />
                                    <SelectValue placeholder="Location" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {LOCATIONS.map(loc => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Company filter */}
                        <Select value={company_id} onValueChange={setCompany_id}>
                            <SelectTrigger className="h-10 w-full sm:w-44 rounded-xl border-border/40 bg-muted/40 text-sm">
                                <div className="flex items-center gap-2">
                                    <Building2 size={14} className="text-muted-foreground shrink-0" />
                                    <SelectValue placeholder="Company" />
                                </div>
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

                        {/* Search button */}
                        <button
                            type="submit"
                            form="search-form"
                            onClick={handleSearch}
                            className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-sm shadow-indigo-500/20 shrink-0"
                        >
                            Search
                        </button>
                    </div>

                    {/* Active filter chips */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
                            <span className="text-xs text-muted-foreground">Active filters:</span>
                            {activeFilters.map((f, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-medium"
                                >
                                    {f.label}
                                    <button onClick={f.onRemove} className="hover:text-white transition-colors">
                                        <X size={11} />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={() => { clearLocation(); clearCompany(); clearSearch(); }}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Loading bar ── */}
            {loadingJobs && <BarLoader width={"100%"} color='#6366f1' />}

            {/* ── Results ── */}
            <section className="max-w-6xl mx-auto px-4 pb-16 pt-6">
                {/* Result count */}
                {!loadingJobs && dataJobs && (
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm text-muted-foreground">
                            Showing
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
                            {dataJobs.length}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {dataJobs.length === 1 ? "job" : "jobs"}
                            {activeFilters.length > 0 ? " matching your filters" : " available"}
                        </span>
                    </div>
                )}

                {/* Error */}
                {errorJobs && (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                            <X size={24} className="text-destructive" />
                        </div>
                        <p className="text-destructive font-medium">Failed to load jobs</p>
                        <p className="text-sm text-muted-foreground">Please try again later.</p>
                    </div>
                )}

                {/* Empty state */}
                {!loadingJobs && !errorJobs && dataJobs?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-muted/60 flex items-center justify-center">
                            <Briefcase size={32} className="text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">No jobs found</p>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                Try adjusting your filters or search keywords to find more results.
                            </p>
                        </div>
                        {activeFilters.length > 0 && (
                            <button
                                onClick={() => { clearLocation(); clearCompany(); clearSearch(); }}
                                className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                )}

                {/* Job grid */}
                {dataJobs?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {dataJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                savedInit={job?.savedjob?.length > 0}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing
