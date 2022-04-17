import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/userContext';
import AdminLayout from '../../layout/adminLayout';
import Cookies from 'js-cookie';
import { Button, Form, Input, message, Select, Modal } from 'antd';
const { Option } = Select;
import TableFixed from '../../components/table/TableFixed';


const ClassRoutine = () => {
    const { user } = useUser();
    const [classData, setClassData] = useState(null)
    const [routineData, setRoutineData] = useState(null)

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

                    } catch (error) {

                    }
                }
                findClassId()
            }
        }
    }, [user])


    // get routine by class id
    const handleChange = async (value) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/routine/filtered-routine/${value}`);

            if (res.data.status === true) {
                setRoutineData(res.data.routines)
            }

        } catch (error) {
            if (error.response.data.message) {
                message.error(error.response.data.message)
            } else {
                message.error(error.message)
            }
        }
    }

    const column = [
        {
            dataField: 'subject', headerName: 'Subject', formatter: (_, data) => (
                <span className='font-mono'>{data.subject.name?.toUpperCase()}, ({data.subject.code})</span>)
        },
        {
            dataField: 'teacher', headerName: 'Teacher', formatter: (_, data) => (
                <span className={`font-mono ${user?._id === data.teacher._id && 'text-green-500'}`}>{data.teacher.firstName + " " + data.teacher.lastName}</span>)
        },

        {
            dataField: '', headerName: 'Day', formatter: (_, data) => (
                data?.schedules?.map((d, i) => <li key={i} className='list-none text-md font-mono'>{d.day}</li>)
            )
        },

        {
            dataField: '', headerName: 'Time', formatter: (_, data) => (
                data?.schedules?.map((t, i) => <li key={i} className='list-none text-md font-mono'>{t.class_time}</li>)
            )
        },

        {
            dataField: '', headerName: 'Room', formatter: (_, data) => (
                data?.schedules?.map((r, i) => <li key={i} className='list-none text-md font-mono'>{r.class_room}</li>)
            )
        },
    ]

    console.log('classData : ', classData)
    console.log('routineData : ', routineData)


    return (
        <AdminLayout>

            {/* select class, options */}
            <section className='md:mx-10'>
                <Form layout='vertical'>
                    <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback>
                        <Select placeholder='Class Options' onChange={handleChange}>
                            {
                                classData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </section>

            <div className='text-md px-3'>
                <TableFixed data={routineData} columns={column} />
            </div>
        </AdminLayout>
    );
};

export default ClassRoutine;