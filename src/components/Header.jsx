import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Show, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { PenBox, BriefcaseBusiness, Heart } from 'lucide-react'
import { useUser } from '@clerk/react'
const Header = () => {
    
    const [showSignIn, SetShowSignin] = useState(false)
    const { user } = useUser()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get('sign-in')) {
            SetShowSignin(true)
        }
    }, [searchParams])
    const onbackgroundclick = (e) => {
        if (e.target.className == "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm ") {
            SetShowSignin(false)
        }
    }
    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link to="/">
                    <img src="/logo.png" alt="logo" className='h-20' />
                </Link>
                <div className='flex gap-8'>
                    <Show when="signed-out">
                        <Button variant='outline' className="p-5 text-sm" onClick={() => {
                            SetShowSignin(true)
                        }}>Login</Button>


                    </Show>
                    <Show when="signed-in">
                        {
                            user?.unsafeMetadata?.role === 'recruiter' && (
                                <Link to="/postjob">
                                    <Button variant='destructive' className="p-5 text-sm">
                                        <PenBox />
                                        Post Job
                                    </Button>
                                </Link>
                            )}
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'w-10 h-10'
                                }
                            }}
                        >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="My Jobs"
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                    href="/myjob"
                                />
                                <UserButton.Link
                                    label="Saved Jobs"
                                    labelIcon={<Heart size={15} />}
                                    href="/savedjobs"
                                />
                            </UserButton.MenuItems>
                        </UserButton >

                    </Show>
                </div>


            </nav>

            {showSignIn && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm ' onClick={onbackgroundclick}>
                    <SignIn
                        signUpFallbackRedirectUrl='/onboarding'
                        fallbackRedirectUrl='/onboarding'
                    />

                </div>

            )}
        </>

    )
}

export default Header