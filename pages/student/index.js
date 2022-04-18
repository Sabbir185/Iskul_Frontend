import React from 'react';
import AdminLayout from '../../layout/adminLayout';
import { Calendar } from 'antd';
import moment from 'moment';
import classes from './student.module.css'
import NoticeRadicalChar from '../../components/school-dashboard/latest-notice-radicalChart';
import TodayRoutine from '../../components/student-dashboard/todayRoutine';


const StudentList = () => {
    const headerRender = () => null;

    return (
        <AdminLayout>
            <div className='md:grid md:grid-cols-3 h-auto relative'>
                {/* today's routine */}
                <div className='md:col-span-2 h-auto bg-gray-200 p-2 rounded-lg md:mr-3'>
                    <span className='font-mono font-semibold text-lg text-slate-500 border-b-2 pb-1 inline-block border-cyan-400'>Today&apos;s Class Routine <span className='text-green-600 text-sm italic font-smibold'>({moment().format('dddd')})</span> </span>

                    <TodayRoutine />
                </div>

                {/* calendar */}
                <div className='bg-gray-200 w-full h-full -z-0 p-5 rounded-lg mt-3 md:mt-0'>
                    <div className={`${classes.calendar_card}`}>
                        <Calendar headerRender={headerRender} fullscreen={false} />
                    </div>
                </div>
            </div>


            {/* Top 5 notice */}
            <div className='pt-10'>
                <span className='font-mono font-semibold text-lg text-slate-500 border-b-2 pb-1 inline-block border-cyan-400'>Recent Notices</span>

                <NoticeRadicalChar />
            </div>

        </AdminLayout>
    );
};

export default StudentList;