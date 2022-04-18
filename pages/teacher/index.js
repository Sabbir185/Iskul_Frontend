import { Calendar } from 'antd';
import React from 'react';
import NoticeRadicalChar from '../../components/school-dashboard/latest-notice-radicalChart';
import AdminLayout from '../../layout/adminLayout';
import classes from './teacher.module.css'
import moment from 'moment';
import TeacherRoutines from '../../components/teacher-dashboard/teacherRoutines';
import { useState } from 'react';

const TeacherHome = () => {
    const [teacherRoutines, setTeacherRoutines] = useState([]);
    const headerRender = () => null;


    return (
        <AdminLayout>
            <section className='md:grid md:grid-cols-3 h-auto'>
                {/* front view */}
                <div className='col-span-2 h-auto p-3 bg-gray-200 rounded-lg md:mr-1'>
                    <span className='font-mono font-semibold text-lg text-slate-500 border-b-2 pb-1 inline-block border-cyan-400'>Class Schedules</span>

                    <TeacherRoutines setTeacherRoutines={setTeacherRoutines} />
                </div>

                {/* sidebar data */}
                <aside className='-z-0'>
                    {/* calendar */}
                    <div className='bg-gray-200 w-full h-full p-5 pt-3 rounded-lg mt-3 md:mt-0'>
                        <span className='font-mono font-semibold text-lg text-slate-500 border-b-2 pb-1 border-cyan-400 text-center block'>Today is <span className='text-green-600 italic'>{moment().format('dddd')}</span></span>

                        <div className='h-auto w-full pt-3 pb-5'>
                            {
                                teacherRoutines?.map((routine, i) => <div key={i} className='space-x-2 text-center font-mono font-semibold text-slate-600'> 
                                    {
                                        routine?.schedules?.map((schedule, i) =>
                                            <span key={i} className=''>{schedule.day === moment().format('dddd') &&  <span className="uppercase">{routine.subject.name}</span>}</span>)
                                    }
                                    {
                                        routine?.schedules?.map((schedule, i) =>
                                            <span key={i + 2} className=''>{schedule.day === moment().format('dddd') &&  schedule.class_time}</span>)
                                    }
                                    {
                                        routine?.schedules?.map((schedule, i) =>
                                            <span key={i + 3} className=''>{schedule.day === moment().format('dddd') &&  schedule.class_room}</span>)
                                    }
                                </div>)
                            }
                        </div>


                        <div className={`${classes.calendar_card}`}>
                            <Calendar headerRender={headerRender} fullscreen={false} />
                        </div>
                    </div>
                </aside>
            </section>

            {/* middle view */}
            <section className='pt-10'>
                <span className='font-mono font-semibold text-lg text-slate-500 border-b-2 pb-1 inline-block border-cyan-400'>Recent Notices</span>

                <NoticeRadicalChar />
            </section>

        </AdminLayout>
    );
};

export default TeacherHome;