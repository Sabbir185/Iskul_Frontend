import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AssignedClassView from '../../../components/assigned-class';
import { useUser } from '../../../contexts/userContext';
import AdminLayout from '../../../layout/adminLayout';

const AssignedClass = () => {
    const { user } = useUser()
    const [classData, setClassData] = useState(null);

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
                        }

                    } catch (error) {
                        message.error(error.response.data.message)
                    }
                }
                getClassData();
            }
        }
    }, [user])


    return (
        <AdminLayout>
            <section className='bg-slate-300 w-full h-full p-5 rounded-lg pb-10'>
                <h1 className='text-center font-semibold text-lg text-slate-700'>Assigned Class List</h1>

                {
                    classData?.map(cls => <AssignedClassView key={cls._id} data={cls} />)
                }
            </section>
        </AdminLayout>
    );
};

export default AssignedClass;