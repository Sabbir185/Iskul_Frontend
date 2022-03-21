import React, { useState, useEffect } from 'react';
import NumberOfInstance from '../../components/helper/numberOfInstance';
import AdminLayout from '../../layout/adminLayout';
import axios from 'axios';
import Image from 'next/image'
import Cookies from 'js-cookie';
import classes from './admin.module.css'
import img1 from '../../public/images/1.jpg'
import img2 from '../../public/images/2.jpg'
import img3 from '../../public/images/3.jpg'


const Admin = () => {
    const [schools, setSchools] = useState([])
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {
        try {
            async function getAllData() {
                const schoolData = await axios.get(`http://localhost:8080/api/school/get-all`);
                setSchools(schoolData.data.schools)
            }
            getAllData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])


    useEffect(() => {
        try {
            async function getTeacherData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const teacherData = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=headmaster&role=teacher`, config);
                setTeachers(teacherData.data.data)
            }
            getTeacherData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])


    useEffect(() => {
        try {
            async function getTeacherData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const studentData = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=student`, config);
                setStudents(studentData.data.data)
            }
            getTeacherData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])


    const sch = schools.slice(0,8)
    const tea = teachers.slice(0,8)


    return (
        <AdminLayout>
            <h1 className='ml-5 font-bold text-lg mt-1 pb-3 text-cyan-500 text-xl font-bold'>Admin Dashboard</h1>

            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='bg-gray-200 h-auto md:h-screen col-span-2 rounded-xl md:mr-2'>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 pt-5 justify-center mx-5 '>
                        <NumberOfInstance school={'Schools'} total={schools.length} />
                        <NumberOfInstance school={'Teachers'} total={teachers.length} />
                        <NumberOfInstance school={'Students'} total={students.length} />
                    </div>

                    <div className='bg-gray-50 w-auto h-52 mt-5 md:mt-10 mx-5 p-4'>
                        <h1 className='font-semibold text-cyan-500 text-xl font-bold'>Analysis</h1>
                        <div className=''>
                           
                        </div>
                    </div>

                    <div className='bg-gray-50 w-auto h-auto md:h-52 mt-5 mx-5 shadow-xl'>
                        <h1 className='pl-3 font-semibold text-cyan-500 text-xl font-bold md:pt-2'>Events</h1>
                        {/* md:grid md:grid-cols-3 md:gap-3 md:content-center md:mx-3 */}
                        <div className='md:flex md:justify-evenly md:items-center md:mt-5 md:mx-2'>
                            <div className='w-auto p-3 md:p-0'>
                                <Image src={img1} alt="event-image1" className={`shrink rounded-xl ${classes.eventImg}`} />
                            </div>
                            <div className='w-auto p-3 md:p-0 md:content-center md:px-2'>
                                <Image src={img2} alt="event-image2" className={`shrink rounded-xl ${classes.eventImg}`} />
                            </div>
                            <div className='w-auto p-3 md:p-0'>
                                <Image src={img3} alt="event-image3" className={`shrink rounded-xl ${classes.eventImg}`} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='bg-gray-200 h-screen p-4 grid grid-rows-2 gap-4 rounded-xl shadow-xl mt-5 md:mt-0'>
                    <div className='bg-gray-50 w-auto pl-4 pr-4 rounded-xl'>
                        <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Schools</h1>
                        {
                            sch?.map(school => <li key={school._id} className={classes.liStyle}>{school.schoolName}</li>)
                        }

                    </div>

                    <div className='bg-gray-50 w-auto pl-4 pr-4 rounded-xl shadow-xl'>
                        <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Teachers</h1>
                        {
                            tea?.map(teacher => <li key={teacher._id} className={classes.liStyle}>{teacher.firstName + " " + teacher.lastName}</li>)
                        }
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
};

export default Admin;