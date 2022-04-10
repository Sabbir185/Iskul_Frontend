import React from 'react';
import AdminLayout from '../../layout/adminLayout';
import reward from '../../public/images/reward.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/userContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import StudentChart from '../../components/helper/studentChart';
import { BiChalkboard } from 'react-icons/bi';
import { MdQuiz, MdLocalActivity } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';

const StudentList = () => {
    const { user } = useUser();
    const [classData, setClassData] = useState([])
    const [routineData, setRoutineData] = useState([])

    // get class id by user id
    useEffect(() => {
        if (!!user) {
            const id = user?._id;
            if (!!id) {
                async function findClassId() {
                    const token = await Cookies.get('token');
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                    try {
                        const res = await axios.get(`http://localhost:8080/api/class/find-classes-by-studentId/${id}`, config);

                        setClassData(res.data.studentClass)
                        //console.log("student class=", res.data)

                    } catch (error) {

                    }
                }
                findClassId()
            }
        }
    }, [user])

   
    return (
        <AdminLayout>
            <div className='grid grid-cols-1 md:grid-cols-3 md:h-screen'>
                <div className='bg-gray-200 h-auto md:h-screen col-span-2 grid-rows-2 rounded-xl md:mr-2'>
                    <div className='bg-gray-50 w-auto h-auto mt-25 col-span-2 md:mt-5 mx-5 p-4 md:flex rounded-xl'>
                        <div><StudentChart /></div>
                        <div className='my-5'>
                            <div className='flex'><BiChalkboard className='text-[#0088fe] mt-1' /><p className='text-[#0088fe]'> CLasses Finish On Time</p></div>
                            <div className='flex'><MdQuiz className='text-[#00C49F] mt-1' /><p className='text-[#00C49F]'>Quiz</p></div>
                            <div className='flex'><FiCheck className='text-[#FFBB28] mt-1' /><p className='text-[#FFBB28]'>Attendance</p></div>
                            <div className='flex'><ImCross className='text-[#fe0004] mt-1' /><p className='text-[#fe0004]'>Absent</p></div>
                            <div className='flex'><MdLocalActivity className='text-[#FF8042] mt-1' /><p className='text-[#FF8042]'>Regular activities</p></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 md:h-screen my-4 mx-4'>
                        <div className='bg-blue-500 h-32 rounded-xl md:mr-2 '>
                            <h2 className="font-bold text-md text-white text-center text-lg pt-2">{classData[0]?.name}</h2>
                        </div>
                        <div className='bg-indigo-500 h-32 rounded-xl md:mr-2 md:mt-0 mt-4'>
                        <h2 className="font-bold text-md text-white text-center text-lg pt-2">Continuous Assessment Comming Soon...</h2>
                        </div>
                        <div className='bg-red-500 h-32 rounded-xl md:mr-2 md:mt-0 mt-4'>
                        <h2 className="font-bold text-md text-white text-center text-lg pt-2">Todays Classes</h2>
                        </div>
                    </div>
                </div>
                <div className='md:h-screen p-2 bg-gray-200 grid grid-rows-3 rounded-xl mt-5 md:mt-0'>
                    <div className='bg-blue-500 rounded-xl pb-2 h-44 mx-2'>
                        <div className='flex justify-center pt-5'>
                            <Image src={reward} />
                        </div>
                        <h1 className="font-bold text-md text-white text-center text-lg pt-2"> Reward</h1>
                    </div>
                    <div className='bg-slate-50 row-span-2 rounded p-2 h-60 text-white font-bold text-lg text-center'>
                        <div className='bg-violet-400 h-12 rounded py-2'>Total Class Count {classData.length}</div>
                        <div className='bg-lime-500 h-12 my-2 rounded py-2'>Total Exam </div>
                        <div className='bg-green-500 h-12 rounded py-2'>Total Quiz</div>
                        <div className='bg-sky-500 h-12 my-2 rounded py-2'>Over All CGPA</div>
                    </div>
                </div>


            </div>
        </AdminLayout>
    );
};

export default StudentList;