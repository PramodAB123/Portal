import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/react'
import { Heart, MapPin, Building2, ArrowRight } from 'lucide-react'
import { Badge } from './ui/badge'
import { saveJob } from '@/api/apiJobs'
import useFetch from '@/hooks/UseFetch'
import { Link } from 'react-router-dom'

const JobCard = ({ job, isMyJob = false, savedInit = false, onJobSaved = () => { } }) => {
    const { user } = useUser()
    const [saved, setSaved] = useState(savedInit)
    const [savedRecord, setSavedRecord] = useState(job?.savedjob?.[0] || null)

    const {
        data: savedJobData,
        loading: loadingSavedJob,
        fn: fnSavedJob,
    } = useFetch(saveJob, {
        alreadySaved: savedRecord,
        saveData: { job_id: job.id, user_id: user?.id },
    })

    useEffect(() => {
        if (savedJobData !== undefined) {
            setSavedRecord(savedJobData?.data || null)
        }
    }, [savedJobData])

    const handleSaveToggle = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        await fnSavedJob({
            alreadySaved: savedRecord,
            saveData: { job_id: job.id, user_id: user?.id },
        })
        setSaved((prev) => {
            onJobSaved(!prev)
            return !prev
        })
    }

    return (
        <div className="group relative flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            {/* Company logo strip */}
            {job?.company?.logo ? (
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="h-10 w-auto max-w-[120px] object-contain"
                    />
                    {/* Save button */}
                    {!isMyJob && (
                        <button
                            onClick={handleSaveToggle}
                            disabled={loadingSavedJob}
                            aria-label={saved ? "Unsave job" : "Save job"}
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-red-400/40 hover:bg-red-500/10 transition-all"
                        >
                            <Heart
                                size={15}
                                className={saved
                                    ? "fill-red-500 stroke-red-500"
                                    : "stroke-muted-foreground group-hover:stroke-red-400 transition-colors"
                                }
                            />
                        </button>
                    )}
                    {isMyJob && (
                        <Badge variant="secondary" className="text-xs">My Posting</Badge>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                        <Building2 size={18} className="text-indigo-400" />
                    </div>
                    {!isMyJob ? (
                        <button
                            onClick={handleSaveToggle}
                            disabled={loadingSavedJob}
                            aria-label={saved ? "Unsave job" : "Save job"}
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-red-400/40 hover:bg-red-500/10 transition-all"
                        >
                            <Heart
                                size={15}
                                className={saved
                                    ? "fill-red-500 stroke-red-500"
                                    : "stroke-muted-foreground group-hover:stroke-red-400 transition-colors"
                                }
                            />
                        </button>
                    ) : (
                        <Badge variant="secondary" className="text-xs">My Posting</Badge>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 px-5 pb-3 space-y-2">
                <h3 className="font-semibold text-base leading-snug line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {job.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {job.company?.name && (
                        <span className="flex items-center gap-1">
                            <Building2 size={11} />
                            {job.company.name}
                        </span>
                    )}
                    {job.location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {job.location}
                        </span>
                    )}
                </div>
                {job.description && (
                    <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                        {job.description}
                    </p>
                )}
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-border/40" />

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3">
                {job.type && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                        {job.type}
                    </span>
                )}
                <Link
                    to={`/job/${job.id}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-indigo-400 transition-colors group/btn"
                >
                    View details
                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </div>
    )
}

export default JobCard
