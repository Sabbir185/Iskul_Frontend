import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { message } from 'antd';

const SchoolDetails = ({ id }) => {
    const [classData, setClassData] = useState({});

    useEffect(() => {
        if (!!id) {
            const dataFetch = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/api/class/${id}`)
                    setClassData(res.data.classInfo)

                } catch (error) {
                    alert('Failed to fetch!')
                }
            }
            dataFetch()
        }
    }, [id])

    console.log(classData)


    return (
        <div >
            <h1>{classData.name + " " + "Group"}</h1>
            <h1>Subjects: {classData?.subjects?.length}</h1>
            <h1>Teachers: {classData?.teachers?.length}</h1>
            <h1>Students: {classData?.students?.length}</h1>

            {
                !!classData &&
                <div className='md:flex mt-5 mx-auto text-center'>
                    <div className='border-r-2 mr-2 pr-2 md:w-64'>
                        <p>Subjects</p>
                        <ul>
                            {
                                classData?.subjects?.map((s, i) => <li key={i}>
                                    {s.name}, Code: {s.code}
                                </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='md:w-64'>
                        <p>Teachers</p>
                        <ul>
                            {
                                classData?.teachers?.map((t, i) => <li key={i}>
                                    {t.firstName+" "+t.lastName}
                                </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default SchoolDetails;