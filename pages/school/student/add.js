import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../../../contexts/userContext';


const AddStudent = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { user } = useUser()

    const onFinish = (values) => {
        console.log(values)
        // async function createStudent() {
        //     try {
        //         const token = await Cookies.get('token');
        //         const config = {
        //             headers: { Authorization: `Bearer ${token}` }
        //         }
        //         const response = await axios.post('http://localhost:8080/api/user/signup', values, config);

        //         if (response.data.status === true) {
        //             toast.success('New Student Created Successfully!', {
        //                 position: "top-center",
        //                 autoClose: 2500,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //             });
        //             setTimeout(() => {
        //                 router.push('/school/student/view-all')
        //             }, 2700);
        //         }

        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // createStudent()
    };



    return (
        <AdminLayout>
            <h1 className='text-center py-2 font-semibold text-lg text-green-600'>Add A New Student</h1>
            <div className='m-auto bg-green-200 rounded-lg p-10 shadow-md font-semibold md:w-3/5 h-auto'>

                <Form
                    onFinish={onFinish}
                    layout='vertical'
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    name="control-hooks"
                >

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

                    <div className='grid grid-cols-2 gap-1'>
                        <Form.Item
                            label="School ID"
                            name="schoolId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Confirm Password!',
                                },
                            ]}
                        >
                            <Input defaultValue={user?.schoolId._id} />
                        </Form.Item>


                        <Form.Item
                            label="Class"
                            name="currentClass"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Class!',
                                },
                            ]}
                        >
                            <Input placeholder='Class' />
                        </Form.Item>
                    </div>


                    <Form.Item name="role" label="Designation" rules={[{ required: true, message: 'Please Select Role' }]}>
                        <Select placeholder="Select Role">
                            <Option value='teacher'>Teacher</Option>
                            <Option value='student'>Student</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    );
};

export default AddStudent;