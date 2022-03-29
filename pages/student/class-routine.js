import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/userContext';
import AdminLayout from '../../layout/adminLayout';
import Cookies from 'js-cookie';
import { Button, Form, Input, message, Select, Modal } from 'antd';
const { Option } = Select;
import Table from '../../components/table/table';


const ClassRoutine = () => {
    const { user } = useUser();
    const [classData, setClassData] = useState(null)
    const [routineData, setRoutineData] = useState(null)

    // get class id by user id
    useEffect(() => {
        if (!!user) {
            async function findClassId() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                try {
                    const res = await axios.get(`http://localhost:8080/api/class/find-classes-by-studentId/${user?._id}`, config);

                    setClassData(res.data.studentClass)

                } catch (error) {

                }
            }
            findClassId()
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
            dataField: 'class_name', headerName: 'Class', formatter: (class_name, data) => (
                <p>{data.class_name.name}</p>
            )
        },
        {
            dataField: 'subject', headerName: 'Subject', formatter: (_, data) => (
                <p>{data.subject.name + ',  ' + data.subject.code}</p>
            )
        },
        {
            dataField: 'teacher', headerName: 'Teacher', formatter: (_, data) => (
                <p>{data.teacher.firstName + ' ' + data.teacher.lastName}</p>
            )
        },
        {
            dataField: 'day1', headerName: 'Class Time', formatter: (_, data) => (
                <p>{data.day1_time[0] + ', ' + data.day1_time[1]}</p>
            )
        },
        {
            dataField: 'day1', headerName: 'Class Time', formatter: (_, data) => (
                <p>{data.day2_time[0] + ', ' + data.day2_time[1]}</p>
            )
        },

    ]


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
                <Table data={routineData} columns={column} />
            </div>
        </AdminLayout>
    );
};

export default ClassRoutine;