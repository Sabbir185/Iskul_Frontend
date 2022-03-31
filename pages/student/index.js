import Image from 'next/image';
import React from 'react';
import ChartView from '../../components/helper/chartView';
import NumberOfInstance from '../../components/helper/numberOfInstance';
import StudentLayout from '../../layout/adminLayout';
import student1 from '../../public/images/student1.jpg';
import student2 from '../../public/images/student2.jpg';
import student3 from '../../public/images/student3.jpg';
import classes from './student.module.css';

const StudentList = () => {
    return (
        <StudentLayout>
             <h1 className='ml-5 font-bold text-lg mt-1 pb-3 text-cyan-500 text-xl font-bold'>Student Dashboard</h1>

            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='bg-gray-200 h-auto md:h-screen col-span-2 rounded-xl md:mr-2'>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 pt-5 justify-center mx-5 '>
                       <NumberOfInstance school={'Courses'} total={"7"}/>
                       <NumberOfInstance  school={'Exams'} total={"4"}/>
                       <NumberOfInstance  school={'Teachers'} total={"7"}/>
                    </div>

                    <div className='bg-gray-50 w-auto h-52 mt-5 md:mt-10 mx-5 p-4'>
                        <h1 className='font-semibold text-cyan-500 text-xl font-bold'>Attendence</h1>
                        <div className=''>
                           <h1>Chart</h1>
                           <ChartView />
                        </div>
                    </div>

                    <div className='bg-gray-50 w-auto h-auto md:h-52 mt-5 mx-5 shadow-xl'>
                        <h1 className='pl-3 font-semibold text-cyan-500 text-xl font-bold md:pt-2'>Events</h1>
                        <div className='md:flex md:justify-evenly md:items-center md:mt-5 md:mx-2'>
                            <div className='w-auto p-3 md:p-0'>
                                <Image src={student1} alt="event-image1" className={`shrink rounded-xl ${classes.eventImg}`} />
                            </div>
                            <div className='w-auto p-3 md:p-0 md:content-center md:px-2'>
                                <Image src={student2} alt="event-image2" className={`shrink rounded-xl ${classes.eventImg}`} />
                            </div>
                            <div className='w-auto p-3 md:p-0'>
                                <Image src={student3} alt="event-image3" className={`shrink rounded-xl ${classes.eventImg}`} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='bg-gray-200 h-screen p-4 grid grid-rows-2 gap-4 rounded-xl shadow-xl mt-5 md:mt-0'>
                    <div className='bg-gray-50 w-auto pl-4 pr-4 rounded-xl'>
                        <h1 className="font-bold text-md border-b-2 mt-2"> All Notice</h1>
                        Notice

                    </div>

                    <div className='bg-gray-50 w-auto pl-4 pr-4 rounded-xl shadow-xl'>
                        <h1 className="font-bold text-md border-b-2 mt-2">Course Teachers</h1> Teachers
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentList;