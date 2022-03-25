import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, Button, Select, message } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useUser } from '../../../contexts/userContext';


const CreateClass = () => {
    const { user } = useUser();
    const router = useRouter();
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);

    // fetching all subject
    useEffect(() => {
        async function schools() {
            try {
                const res = await axios.get('http://localhost:8080/api/subject/get-all');
                setSubjects(res.data.subjects)

            } catch (error) {
                alert(error.response.data.message)
            }
        }
        schools()
    }, [])

    // fetching all teacher
    useEffect(() => {
        async function teachersData() {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            try {
                const res = await axios.get('http://localhost:8080/api/user/get-filtered-data?role=teacher', config);
                setTeachers(res.data.data)

            } catch (error) {
                alert(error.response.data.message)
            }
        }
        teachersData()
    }, [])


    // create class
    const onFinish = (values) => {
        values.school = user.schoolId._id;
        async function createClass() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.post('http://localhost:8080/api/class/create', values, config);

                if (response.data.status === true) {
                    message.success('New Class Created Successfully!');
                    setTimeout(() => {
                        router.push('/school')
                    }, 2000);
                }

            } catch (error) {
                if (error.response.data.message) {
                    message.error(error.response.data.message);
    
                } else {
                    message.warning("Failed, maybe you're not authorized!");
                }
            }
        }
        createClass()
    };


    // handle subjects section
    const subjectSelectedData = [];
    for (let i = 0; i < subjects.length; i++) {
        subjectSelectedData.push(<Option key={i} value={subjects[i]._id}>{subjects[i].name}</Option>);
    }

    // handle teachers section
    const teacherSelectedData = [];
    for (let i = 0; i < teachers.length; i++) {
        teacherSelectedData.push(<Option key={i} value={teachers[i]._id}>{teachers[i].firstName + ' ' + teachers[i].lastName}</Option>);
    }



    return (
        <AdminLayout>
            <div className='bg-slate-300 h-screen p-0 m-0'>
                <h1 className='text-center py-2 font-semibold text-lg text-cyan-800'>Create New Class</h1>
                <div className='m-auto bg-slate-200 rounded-lg p-10 shadow-lg font-semibold md:w-3/5 h-auto'>

                    <Form onFinish={onFinish} layout='vertical'>
                        <Form.Item
                            label="Department Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Department Name!',
                                },
                            ]}
                        >
                            <Input placeholder='Name' />
                        </Form.Item>

                        <Form.Item name="subjects" label="Select Subjects" rules={[{ required: true, message: 'Please Select subjects' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='Subjects'>
                                {subjectSelectedData}
                            </Select>

                        </Form.Item>

                        <Form.Item name="teachers" label="Select Teachers" rules={[{ required: true, message: 'Please Select teachers' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='Teachers'>
                                {teacherSelectedData}
                            </Select>

                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateClass;
