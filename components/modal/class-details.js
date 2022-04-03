import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { message } from 'antd';

const ClassDetails = ({ id }) => {
    const [classData, setClassData] = useState({});

    useEffect(() => {
        if (!!id) {
            const dataFetch = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/api/class/${id}`)
                    setClassData(res.data.classInfo)

                } catch (error) {
                    message.error('Failed to fetch!')
                }
            }
            dataFetch()
        }
    }, [id])


    let uniqueSubjects = [];
    classData?.class_info?.forEach((data) => {
        const subName = data.subjects.name
        if (!uniqueSubjects.includes(subName)) {
            uniqueSubjects.push(subName);
        }
    });


    return (
        <div >
            <h1>{classData.name}</h1>
            <h1>Subjects: {uniqueSubjects?.length}</h1>
            <h1>Teachers: {classData?.class_info?.length}</h1>
            <h1>Students: {classData?.students?.length}</h1>

            {
                !!classData &&
                <div className='md:flex mt-5 mx-auto text-center'>
                    <div className='border-r-2 mr-2 pr-2 md:w-64'>
                        <p className='text-green-800'>Subjects</p>
                        <ul>
                            {
                                classData?.class_info?.map((data, i) => <li key={i}>
                                    {data.subjects.name}, Code: {data.subjects.code}
                                </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='md:w-64'>
                        <p className='text-green-800'>Teachers</p>
                        <ul>
                            {
                                classData?.class_info?.map((data, i) => <li key={i}>
                                    {data.teachers.firstName + " " + data.teachers.lastName}
                                </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }

            <p className='mt-3 text-green-800'>Class Rooms : </p>
            <div className='flex gap-4'>
                {
                    classData?.class_rooms?.map((data, i) => <p key={i} className=''>
                        {data}
                    </p>)
                }
            </div>

            <p className='mt-3 text-green-800'>Class Times : </p>
            <div className='flex gap-4'>
                {
                    classData?.class_times?.map((data, i) => <p key={i} className=''>
                        {data}
                    </p>)
                }
            </div>

        </div>
    );
};

export default ClassDetails;