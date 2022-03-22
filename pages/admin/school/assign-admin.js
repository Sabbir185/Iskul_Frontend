import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';


const AssignAdmin = () => {
    const router = useRouter();
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        async function schools() {
            try {
                const res = await axios.get('http://localhost:8080/api/school/get-all');
                setSchools(res.data.schools)

            } catch (error) {
                console.log(error)
            }
        }
        schools()
    }, [])


    const onFinish = (values) => {
        async function createHeadmaster() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.post('http://localhost:8080/api/user/signup', values, config);

                if (response.data) {
                    toast.success('New Headmaster Created Successfully!');
                    setTimeout(() => {
                        router.push('/admin')
                    }, 2700);
                }

            } catch (error) {
                console.log(error)
            }
        }
        createHeadmaster()
    };


    const schoolsData = schools.slice(0, 7);

    // w-8/12
    // style={{ width: '60%', height: 'auto' }}
    return (
        <AdminLayout>
            <h1 className='text-center py-2 font-semibold text-lg text-green-600'>Assign admin for a school</h1>
            <div className='m-auto bg-green-200 rounded-lg p-10 shadow-md font-semibold md:w-3/5 h-auto'>

                <Form onFinish={onFinish} layout='vertical'>
                    <Form.Item name="schoolId" label="Schools" rules={[{ required: true, message: 'Please Select a School' }]}>
                        <Select
                            placeholder="Select a school"
                        >
                            {
                                schoolsData?.map(school =>
                                    <Option key={school._id} value={school._id}>{school.schoolName}</Option>
                                )
                            }

                        </Select>
                    </Form.Item>

                    <div className='md:grid md:grid-cols-2 md:gap-1'>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input First Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Last Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div className='md:grid md:grid-cols-2 md:gap-1'>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Valid Password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Confirm Password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </div>

                    <Form.Item name="role" label="Designation" rules={[{ required: true, message: 'Please Select Role' }]}>
                        <Select placeholder="Select Role">
                            <Option value='headmaster'>Headmaster</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AdminLayout>
    );
};

export default AssignAdmin;