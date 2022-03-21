import React, { useState, useEffect } from 'react';
import NumberOfInstance from '../../components/helper/numberOfInstance';
import AdminLayout from '../../layout/adminLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import classes from './admin.module.css'
import Events from '../../components/helper/events';
import img1 from '../../public/images/1.jpg'
import img2 from '../../public/images/2.jpg'
import img3 from '../../public/images/3.jpg'
import img4 from '../../public/images/4.jpg'
import img5 from '../../public/images/5.jpg'
import img7 from '../../public/images/7.jpg'



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


    return (
        <AdminLayout>
            <h1 className='ml-5 font-bold text-lg mt-1 pb-3 text-green-600'>Admin Dashboard</h1>

            <div className='grid grid-cols-3'>
                <div className='bg-red-500 h-screen col-span-2'>
                    <div className='grid grid-cols-3 gap-10 pt-5 justify-center mx-5'>
                        <NumberOfInstance school={'Schools'} total={schools.length} />
                        <NumberOfInstance school={'Teachers'} total={teachers.length} />
                        <NumberOfInstance school={'Students'} total={students.length} />
                    </div>

                    <div className='bg-gray-700 w-auto h-52 mt-10 mx-5 flex justify-center items-center p-4'>
                        <div className='flex justify-center items-center'>
                            <Events image={img1} ind={1} />
                            <Events image={img2} ind={2} />
                            <Events image={img3} ind={3} />
                        </div>
                    </div>

                    <div className='bg-gray-700 w-auto h-52 mt-5 mx-5 flex justify-center items-center p-4'>
                        <div className='flex justify-center items-center'>
                            <Events image={img4} ind={4} />
                            <Events image={img5} ind={5} />
                            <Events image={img7} ind={7} />
                        </div>
                    </div>
                </div>

                <div className='bg-gray-800 h-screen p-4 grid grid-rows-2 gap-4'>
                    <div className='bg-red-500 w-auto pl-4 pr-4'>
                        <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Schools</h1>
                        {
                            schools?.map(school => <li key={school._id} className={classes.liStyle}>{school.schoolName}</li>)
                        }

                    </div>

                    <div className='bg-green-600 w-auto pl-4 pr-4'>
                        <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Teachers</h1>
                        {
                            teachers?.map(teacher => <li key={teacher._id} className={classes.liStyle}>{teacher.firstName + " " + teacher.lastName}</li>)
                        }
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
};

export default Admin;