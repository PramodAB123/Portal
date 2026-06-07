import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/react'
import {
    Card,
    CardAction,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Heart } from 'lucide-react'
import { saveJob } from '@/api/apiJobs'
import useFetch from '@/hooks/UseFetch'

const JobCard = ({ job, isMyJob = false, savedInit = false, onJobSaved = () => { } }) => {
    const { user } = useUser()
    const [saved, setSaved] = useState(savedInit)
    // Track the actual savedjobs record (has the real DB id needed for delete)
    const [savedRecord, setSavedRecord] = useState(job?.savedjob?.[0] || null)

    const {
        data: savedJobData,
        loading: loadingSavedJob,
        fn: fnSavedJob,
    } = useFetch(saveJob, {
        alreadySaved: savedRecord,
        saveData: { job_id: job.id, user_id: user?.id },
    })

    // After a save/unsave API call, sync the savedRecord state
    useEffect(() => {
        if (savedJobData !== undefined) {
            setSavedRecord(savedJobData?.data || null)
        }
    }, [savedJobData])

    const handleSaveToggle = async () => {
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
        <>
            <Card className="flex flex-col">
                {job?.company?.logo && (
                    <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="h-40 w-full object-contain p-4 bg-muted/20"
                    />
                )}
                <CardHeader className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl font-bold line-clamp-1">
                            {job.title}
                        </CardTitle>
                        <CardAction>
                            {isMyJob && (
                                <Badge variant="outline" className="ml-auto">
                                    Edit
                                </Badge>
                            )}
                        </CardAction>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        {job.company?.name && <span>{job.company.name}</span>}
                        <span>•</span>
                        <span>{job.location}</span>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                        {job.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-2">
                    <Button className="flex-1" variant="secondary">Details</Button>
                    {!isMyJob && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleSaveToggle}
                            disabled={loadingSavedJob}
                            aria-label={saved ? "Unsave job" : "Save job"}
                        >
                            <Heart
                                size={18}
                                className={saved ? "fill-red-500 stroke-red-500" : "stroke-current"}
                            />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default JobCard
