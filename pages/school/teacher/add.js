import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, Button, Select, message } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../../../contexts/userContext';


const TeacherAdd = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { user } = useUser()

    const onFinish = (values) => {
        values.schoolId = user?.schoolId._id
        async function createTeacher() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.post('http://localhost:8080/api/user/signup', values, config);

                if (response.data.status === true) {
                    message.success('New Teacher Created Successfully!');
                    setTimeout(() => {
                        router.push('/school/teacher/view-all')
                    }, 2500);
                }

            } catch (error) {
                if (error.response.data.message) {
                    message.error(error.response.data.message);

                } else {
                    message.warning("Failed, maybe you're not authorized!");
                }
            }
        }
        createTeacher()
    };


    // to handle refresh error
    // initialValue="" use for hard-coding assign value
    useEffect(() => {
        if (!!user) {
            form.setFieldsValue({
                schoolId: user?.schoolId?._id
            })
        }

    }, [user])



    return (
        <AdminLayout>
            <div className='bg-slate-300 h-screen rounded-md p-0 m-0'>
                <h1 className='text-center py-2 font-semibold text-lg text-cyan-800'>Add A New Teacher</h1>
                <div className='m-auto bg-slate-200 rounded-lg p-10 shadow-lg font-semibold md:w-3/5 h-auto'>

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
                                {
                                    type: 'email',
                                    message: 'Incorrect email'
                                }
                            ]}
                            hasFeedback
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
                                    {
                                        min: 6,
                                        message: 'Please provide at least 6 characters'
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Incorrect Password!")
                                        }
                                    })
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>


                        <Form.Item name="role" label="Designation" rules={[{ required: true, message: 'Please Select Role' }]}>
                            <Select placeholder="Select Role">
                                <Option value='teacher'>Teacher</Option>
                            </Select>
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form>
                </div>
            </div>

        </AdminLayout>
    );
};

export default TeacherAdd;