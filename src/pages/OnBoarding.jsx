import React, { useEffect } from 'react'
import { useUser } from '@clerk/react'
import { BarLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
const OnBoarding = () => {
    const { user, isLoaded } = useUser()
    const navigate = useNavigate()

    const handleroleselection = async (role) => {
        await user.update({
            unsafeMetadata: {
                role: role,
            }
        }).then(() => {
            navigate(role === 'candidate' ? '/joblisting' : '/postjob')
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        if (user?.unsafeMetadata?.role) {
            navigate(user?.unsafeMetadata?.role === 'candidate' ? '/joblisting' : '/postjob')
        }
    }, [user])
    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='blue' />
    }
    return (
        <div className='flex flex-col items-center justify-center mt-32'>
            <h2 className='text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-center bg-linear-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg'>
                I am a...
            </h2>
            <div className='flex flex-col sm:flex-row gap-8 mt-12'>
                <Button size="lg" variant="default" className="h-36 w-72 text-2xl" onClick={() => { handleroleselection('candidate') }}>Candidate</Button>
                <Button size="lg" variant="outline" className="h-36 w-72 text-2xl" onClick={() => { handleroleselection('recruiter') }}>Recruiter</Button>
            </div>
        </div>
    )
}

export default OnBoarding