import NavBar from '@/components/NavBar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoLocation } from 'react-icons/go'
import { MdCategory, MdEmail } from 'react-icons/md'
import { BsBriefcaseFill, BsFillBookmarkCheckFill } from 'react-icons/bs'
import { AiOutlineArrowRight, AiOutlineDollarCircle } from 'react-icons/ai'
import { RiUserSearchFill } from 'react-icons/ri'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { HiOutlineStar } from 'react-icons/hi'
import { FaUserAstronaut } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setMatchingJobDat } from '@/Utils/JobSlice'
import { get_specified_job } from '@/Services/job'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner'
import useSWR from 'swr'
import { book_mark_job } from '@/Services/job/bookmark'



export default function JobDetails() {
    const router = useRouter()
    const dispatch = useDispatch();
    const { id } = router.query
    const JobData = useSelector(state => state?.Job?.JobData)
    const machingData = useSelector(state => state?.Job?.matchingData)
    const user = useSelector(state => state?.User?.userData)
    const [JobDetails, setJobDetails] = useState(null);


    const { data, error , isLoading } = useSWR(`/get-specified-job`, () => get_specified_job(id));


    useEffect(() => {
        if(data) setJobDetails(data?.data)
    }, [data])


    if(error) toast.error(error)


    useEffect(() => {
        if (JobDetails) {
            const filteredJobData = JobData?.filter((job) => job.job_category === JobDetails?.job_category)
            const filteredJobData2 = filteredJobData?.filter((job) => job._id !== JobDetails?._id)
            dispatch(setMatchingJobDat(filteredJobData2))
        }
    }, [JobDetails, JobData, dispatch])


    const handleApply = () => {
        if (!user) return toast.error('Please Login First');
        router.push(`/frontend/applyJob/${id}`)
    }


    const handleBookMark = async () =>  {

        if (!user) return toast.error('Please Login First');

        const data = {user : user?._id , job : JobDetails?._id}
        const res = await book_mark_job(data);
        if(res.success) {
           return toast.success(res.message)
        }
        else {
            return toast.error(res.message)
        }

    }

    return (
        <>
            {
                isLoading ? (
                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#4f46e5" />
                        <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
                    </div>
                ) : (
                    <>
                        <ToastContainer />
                        <NavBar />
                        <div className='w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col  '>
                            <div className='w-full h-40 bg-gray-50 text-green-900 font-bold flex items-center justify-center flex-col'>
                                <h1 className='text-3xl'>Job Details</h1>
                            </div>
                            <div className='flex items-center  justify-center w-full py-10'>
                                <div className='flex w-full px-8 md:px-20 items-start md:flex-row flex-col md:justify-between justify-center'>
                                    <div className='flex mb-1 items-center justify-center'>
                                        <Image src={"/jobify.jpg"} alt="no-image" className='rounded-full mb-2' width={100} height={100} />
                                        <div className='px-4 mx-2 flex flex-col items-start justify-center'>
                                            <p className='font-semibold text-base mb-1' >{JobDetails?.title} </p>
                                            <p className=' text-sm text-gray-800 mb-1'>{JobDetails?.company}</p>
                                        </div>

                                    </div>
                                    <div className='md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center'>
                                        <div className='flex items-center justify-center mb-1'>
                                            <FaUserAstronaut className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Job Poster </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.user?.name}</p>
                                        </div>
                                        <div className='flex items-center justify-center mb-1'>
                                            <MdEmail className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Email </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center'>
                                        <div className='flex items-center justify-center mb-1'>
                                            <GoLocation className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Location </p>
                                            <p className=' text-sm text-gray-800 mx-1'>Rawalipindi</p>
                                        </div>
                                        <div className='flex items-center justify-center mb-1'>
                                            <MdCategory className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Category </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.job_category}</p>
                                        </div>
                                    </div>
                                    <div className='md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center'>
                                        <div className='flex items-center justify-center mb-1'>
                                            <BsBriefcaseFill className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Job Type </p>
                                            <p className='text-sm text-gray-800 mx-1'>{JobDetails?.job_type}</p>
                                        </div>
                                        <div className='flex items-center justify-center mb-1'>
                                            <AiOutlineDollarCircle className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Salary </p>
                                            <p className=' text-sm text-gray-800 mx-1'>$ {JobDetails?.salary} </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        {
                                            JobDetails?.user?.email === user?.email ? (
                                                <p className='text-xs text-red-500'>unable Apply to your Own jobs</p>
                                            ) : (
                                                <div className='flex items-center justify-center  '>
                                                    <button onClick={handleApply} className='md:px-6 md:py-3 px-1 py-2 mt-2 md:mt-0 bg-gray-400 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-gray-900 text-white  '>Apply Position</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:px-4 py-2 flex items-center md:items-start md:flex-row flex-col justify-start md:justify-center'>
                                <div className='md:w-8/12 w-full md:px-4 py-8 flex flex-col items-center content-start justify-center '>
                                    <h1 className='text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2'>Job Description</h1>
                                    <p className='px-4'>{JobDetails?.description}</p>
                                </div>
                                <div className='md:w-4/12 w-full py-8 px-4 md:px-10'>
                                    <h1 className=' text-2xl font-semibold mb-2'>Job Summary</h1>
                                    <div className='flex items-center justify-start mb-3'>
                                        <RiUserSearchFill className='text-base font-semibold text-indigo-600' />
                                        <p className='font-semibold text-base mx-1'>Total Vacancies </p>
                                        <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.job_vacancy}</p>
                                    </div>
                                    <div className='flex items-center justify-start mb-3'>
                                        <BsFillCalendar2DateFill className='text-base font-semibold text-indigo-600' />
                                        <p className='font-semibold text-base mx-1'>Dead Line</p>
                                        <p className=' text-sm text-gray-800 mx-1'>{new Date(`${JobDetails?.job_deadline}`).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div className='flex items-center justify-start mb-3'>
                                        <HiOutlineStar className='text-base font-semibold text-indigo-600' />
                                        <p className='font-semibold text-base mx-1'>Experience Required</p>
                                        <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.job_experience}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}
