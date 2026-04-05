import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import companies from '@/data/companies.json'
import faqs from '@/data/accordian.json'
import Autoplay from "embla-carousel-autoplay"
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const LandingPage = () => {
    return (
        <>
            <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
                <section className='text-center '>
                    <h1 className='flex flex-col items-center justify-center text-4xl sm:text-6xl lg:text-7xl font-bold'>Find Your Dream Job{" "} <span className='flex items-center gap-6 '>and get {" "}<img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" /></span></h1>
                    <p className='text-sm sm:text-xl lg:text-2xl font-light'>Explore thousands of job opportunities and find the perfect match for your skills and experience. </p>
                </section>
                <div className='flex justify-center items-center gap-4'>
                    <Link to="/joblisting">
                        <Button variant='outline' className="p-6 text-xl hover:bg-amber-600 hover:text-white">Explore Jobs</Button>
                    </Link>
                    <Link to="/postjob">
                        <Button variant='outline' className="p-6 text-xl hover:bg-amber-600 hover:text-white">Post a Job</Button>
                    </Link>
                </div>

                {/* Carousel */}
                <Carousel plugins={[
                    Autoplay({
                        delay: 1000,
                    }),
                ]}
                    className="w-full py-10">
                    <CarouselContent className="-ml-1 -z-10">
                        {companies.map(({ name, id, path }) => (
                            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                                <div className='flex flex-col items-center justify-center '>
                                    <img src={path} alt={name} className='h-9' />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Banner */}

                <div className='flex justify-center'>
                    <img src="./banner.jpeg" alt="" />
                </div>

                {/* CARD */}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <Card className="w-full p-8">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl sm:text-3xl font-bold">For Job Seekers</CardTitle>
                            <CardDescription className="text-base sm:text-lg mt-3 leading-relaxed">
                                Search and apply for jobs, track applications, and find your dream career. Get matched with top employers hiring now.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-full p-8">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl sm:text-3xl font-bold">For Employers</CardTitle>
                            <CardDescription className="text-base sm:text-lg mt-3 leading-relaxed">
                                Post jobs, manage applications, and find the best candidates. Streamline your hiring process with powerful tools.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </section>

                {/* Accordion */}
                <section className='flex justify-center max-w-full'>
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                        className="w-full"
                    >
                        {faqs.map(({ id, question, answer }) => (
                            <AccordionItem key={id} value={`item-${id}`}>
                                <AccordionTrigger>{question}</AccordionTrigger>
                                <AccordionContent>{answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>


            </main>
        </>
    )
}

export default LandingPage