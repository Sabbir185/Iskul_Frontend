import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useUser } from '../../../contexts/userContext';
import { FaUserGraduate, FaUserFriends, FaUserCheck, FaUserTie } from "react-icons/fa";
import { message } from 'antd';

const DashboardCardCounter = () => {
    const { user } = useUser();
    const [students, setStudents] = useState();
    const [teachers, setTeachers] = useState();

    // students
    useEffect(() => {
        if (!!user) {
            const id = user?.schoolId?._id;
            async function getStudent() {
                if (Boolean(id) === true) {
                    try {
                        const token = Cookies.get('token');
                        const config = {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                        const res = await axios.get(`http://localhost:8080/api/user/get-data-schoolId-role/${id}/student`, config);

                        if (res.data.status === true) {
                            setStudents(res.data)
                        }

                    } catch (error) {
                        if (error.response.data.message) {
                            message.error(error.response.data.message)
                        } else {
                            message.error(error.message)
                        }
                    }
                }
            }
            getStudent()
        }
    }, [user])

    // teachers
    useEffect(() => {
        if (!!user) {
            const id = user?.schoolId?._id;
            if (!!id) {
                async function getStudent() {
                    try {
                        const token = Cookies.get('token');
                        const config = {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                        const res = await axios.get(`http://localhost:8080/api/user/get-data-schoolId-role/${id}/teacher`, config);

                        if (res.data.status === true) {
                            setTeachers(res.data)
                        }

                    } catch (error) {
                        if (error?.response?.data?.message) {
                            message.error(error.response.data.message)
                        } else {
                            message.error(error.message)
                        }
                    }
                }
                getStudent()
            }
        }
    }, [user])



    return (
        <div className='flex items-center justify-between gap-8 ml-8 '>
            <div className='bg-emerald-400 w-40 h-20 rounded-lg -space-y-3 shadow-md'>
                <div className='flex items-center justify-center gap-3 pt-2'>
                    <h1 className='text-xl text-slate-800'><FaUserTie /></h1>
                    <h1 className='text-3xl text-slate-800 font-bold'>
                        {teachers?.total}
                    </h1>
                </div>
                <h1 className='text-center text-slate-700'>Teachers</h1>
            </div>

            <div className='bg-emerald-400 w-40 h-20 rounded-lg -space-y-3 shadow-md'>
                <div className='flex items-center justify-center gap-3 pt-2'>
                    <h1 className='text-xl text-slate-800'><FaUserGraduate /></h1>
                    <h1 className='text-3xl text-slate-800 font-bold'>
                        {students?.total}
                    </h1>
                </div>
                <h1 className='text-center text-slate-700'>Students</h1>
            </div>
        </div>
    );
};

export default DashboardCardCounter;

