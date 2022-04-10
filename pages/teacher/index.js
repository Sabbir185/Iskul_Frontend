import React from 'react';
import AdminLayout from '../../layout/adminLayout';
import Image from "next/image";
import logo15 from "../../public/images/t15.png";
import { useUser } from '../../contexts/userContext';
import Notice from './subComponent/notice';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

const TeacherHome = () => {
    const { user, logout } = useUser();
    const [classData, setClassData] = useState([]);
    // data fetched by school and teacher id
    useEffect(() => {
        if (!!user) {
            const teacherId = user?._id
            const schoolId = user?.schoolId?._id
            if (!!teacherId && !!schoolId) {
                const getClassData = async () => {
                    try {
                        const res = await axios.get(`http://localhost:8080/api/class/get-assigned-class?teacherId=${teacherId}&schoolId=${schoolId}`);

                        if (res.data.status === true) {
                            setClassData(res.data.classes)
                            console.log("get data=", res.data)
                        }

                    } catch (error) {
                        message.error(error)
                    }
                }
                getClassData();
            }
        }
    }, [user])
    //console.log("classData=", classData)

    return (
        <AdminLayout>
            <div className='grid grid-cols-1 md:grid-cols-4 md:h-screen'>
                <div className='bg-gray-200 h-auto md:h-screen col-span-3 grid-rows-2 rounded-xl md:mr-2'>
                    <div className='bg-gray-50 w-auto h-auto mt-25 md:mt-5 mx-5 p-4'>
                        <h1 className="font-bold text-md border-b-2">Our Classes...</h1>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {
                                classData?.map(cls => <div key={cls._id} className='odd:bg-sky-300 even:bg-indigo-400 text-center px-5 py-2 rounded text-white font-bold text-lg'>
                                    <p >{cls.name}</p>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className='bg-gray-50 w-auto h-full md:h-auto mt-5 mx-5 p-5 shadow-xl'>
                        <h1 className="font-bold text-md border-b-2">Notice...</h1>
                        <Notice />
                    </div>
                </div>
                <div className='bg-gray-200 h-screen p-2 grid grid-rows-3 rounded-xl shadow-xl mt-5 md:mt-0'>
                    <div className='bg-slate-50 rounded-xl pb-2 h-44'>
                        <div>
                        <h1 className="font-bold text-md text-center text-lg pt-2"> Today activities</h1>
                            <p className="font-bold text-md text-center">{new Date().toDateString()}</p>
                            </div>
                    </div>
                    <div className='bg-slate-50 row-span-2 rounded p-2 h-60 text-white font-bold text-lg text-center'>
                        <div className='bg-violet-400 h-12 rounded py-2'><p>Total Class {classData[0]?.subjects.length} </p></div>
                        <div className='bg-lime-500 h-12 my-2 rounded py-2'><p>Total Student {classData[0]?.students.length} </p></div>
                        <div className='bg-green-500 h-12 rounded py-2'><p>Total Teacher {classData[0]?.teachers?.length}</p></div>
                        <div className='bg-sky-500 h-12 my-2 rounded py-2'><p>Total Exam</p></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default TeacherHome;