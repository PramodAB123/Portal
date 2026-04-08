import React from 'react'
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
const JobCard = ({ job, isMyJob = false, savedInit = false, onJobSaved = () => { } }) => {
    const { user } = useUser();
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
                        <Button variant="outline">Save</Button>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default JobCard