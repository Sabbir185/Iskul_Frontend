import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Modal } from 'antd';
const { Option } = Select;
import axios from 'axios';
import AdminLayout from '../../../layout/adminLayout';
import { useUser } from '../../../contexts/userContext';
import Table from '../../../components/table/table';
import { deleteStudentFromClass } from '../../../components/helper/delete';


const ViewAllEnrolledStudent = () => {
    const { user } = useUser()
    const [classData, setClassData] = useState(null);
    const [studentData, setStudentData] = useState({});
    const [classId, setClassId] = useState(null)


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


    const handleChange = async (value) => {
        setClassId(value)
        try {
            const res = await axios.get(`http://localhost:8080/api/class/${value}`)
            if (res.data.status === true) {
                setStudentData(res.data.classInfo)
            }

        } catch (error) {
            if (error.response.data.message) {
                message.error(error.response.data.message)
            } else {
                message.error(error.message)
            }
        }
    }


    const deleteHandler = async (stdId) => {
        const res = await deleteStudentFromClass(classId, stdId);
        if (res.status) {
            message.success(res.message);
        }
    }


    const column = [
        {
            dataField: 'firstName', headerName: 'Name', formatter: (_, data) => (
                <p>{data.firstName + " " + data.lastName}</p>
            )
        },
        { dataField: 'email', headerName: 'Email' },
        {
            dataField: 'createdAt', headerName: 'Joined', formatter: (createdAt, data) => (
                <p>{new Date(createdAt).toLocaleDateString()}</p>
            )
        },
        {
            dataField: '_id', headerName: 'Action', formatter: _id => (

                <p onClick={() => deleteHandler(_id)} className='text-red-500 cursor-pointer'> <DeleteOutlined /></p>

            )
        },
    ]

    console.log(studentData)

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

            <Table data={studentData.students} columns={column} />

        </AdminLayout>
    );
};

export default ViewAllEnrolledStudent;