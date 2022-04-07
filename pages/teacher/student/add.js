import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/userContext';
import AdminLayout from '../../../layout/adminLayout';
import { useRouter } from 'next/router';
import { Button, Form, Input, message, Select } from 'antd';
const { Option } = Select;
import { AudioOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'
import axios from 'axios';
import Table from '../../../components/table/table';


const AddStudentInClass = () => {
    const { user } = useUser();
    const router = useRouter();
    const [student, setStudent] = useState(null);


    const onSearch = async (value) => {
        const studentInfo = value.addStudent.trim();
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            }
            const res = await axios.get(`http://localhost:8080/api/user/get-filtered-data?email=${studentInfo}`, config)

            if (res.data.status === true) {
                setStudent(res.data.data)
            }

        } catch (error) {
            if (error.response.data.message) {
                message.error(error.response.data.message);

            } else {
                message.warning("Failed, maybe you're not authorized!");
            }
        }
    };


    const [classData, setClassData] = useState(null);
    const [classID, setClassId] = useState(null);

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


    // column and row data
    const column = [
        {
            dataField: 'firstName', headerName: 'Name', formatter: (name, data) => (
                <p className='text-cyan-500'>{data.firstName + " " + data.lastName}</p>
            )
        },
        {
            dataField: 'email', headerName: 'Email', formatter: (email, data) =>
                (<p>{email}</p>)

        },
        {
            dataField: 'role', headerName: 'Role'

        },
        {
            dataField: 'createdAt', headerName: 'Joined', formatter: (createdAt, data) =>
                (<p>{new Date(createdAt).toLocaleDateString()}</p>)

        },

    ]


    const handleChange = (value) => {
        setClassId(value)

    }

    
    // update class, student contains an array
    const onSubmit = async () => {
        const studentId = student[0]?._id;
        const data = {
            students: studentId
        }
        try {
            const token = Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const res = await axios.patch(`http://localhost:8080/api/class/update-classinfo-forstudent/${classID}`, data, config)

            if (res.data.status === true) {
                message.success(res.data.message)
                setTimeout(() => {
                    router.push('/teacher/student/view-all')
                }, 2700);
            }

        } catch (error) {
            if (error.response.data.message)
                message.error(error.response.data.message)
            else
                 message.error(error.message)
        }
    }


    return (
        <AdminLayout>
            <section className='bg-slate-300 h-full rounded-md pt-5 pb-10'>
                {/* search student to confirm */}
                <div className='md:w-1/2 text-center mx-auto bg-slate-200 p-5 rounded-md shadow-md'>
                    <h1 className='text-slate-700'>Add New Student</h1>
                    <Form onFinish={onSearch} layout='vertical'>
                        <Form.Item
                            name="addStudent"
                            hasFeedback
                        >
                            <Input placeholder='enter email' />
                        </Form.Item>

                        <Button type='primary' ghost htmlType='submit'>Search</Button>
                    </Form>
                </div>

                {/* student information and class select  */}
                <div className={student?.length ? `bg-slate-200 mt-8 mx-10 rounded-md shadow-md` : `hidden`}>
                    <Table data={student} columns={column} />

                    <div className='mx-11 p-5'>
                        <Form onFinish={onSubmit} layout='vertical'>
                            <Select placeholder='Select Class' style={{ width: '100%' }} onChange={handleChange}>
                                {
                                    classData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
                                }
                            </Select>

                            <Button type='primary' ghost htmlType='submit' style={{ marginTop: '20px' }}>Add to Class</Button>
                        </Form>

                    </div>
                </div>
            </section>

        </AdminLayout>
    );
};

export default AddStudentInClass;