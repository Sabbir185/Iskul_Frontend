import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import AdminLayout from '../../../layout/adminLayout';


const Edit = () => {
    const router = useRouter();
    const userId = router.query.id;
    const [userData, setUserData] = useState({})
    const token = Cookies.get('token');

    const onFinish = async (values) => {
        console.log(values)
        // try {
        //     const config = {
        //         headers: { Authorization: `Bearer ${token}` }
        //     }
        //     const response = await axios.patch(`http://localhost:8080/api/school/update/${schoolId}`, values, config)
        //     if (response.data) {
        //         alert("Update Successful!")
        //         router.push('/admin')
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    };

    useEffect(() => {
        const getOneUserData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.get(`http://localhost:8080/api/user/get-user-by-id/${userId}`, config);
                setUserData(response.data.data)

            } catch (error) {
                console.log(error.response.data)
            }
        }
        getOneUserData()
    }, [token, userId])

    console.log(userData)

    return (
        <AdminLayout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Update User Information</h1>

            <div className='m-auto bg-green-200 rounded-lg p-10 shadow-md font-semibold' style={{ width: '60%', height: 'auto' }}>

                <Form onFinish={onFinish} layout='vertical'>

                    <div className='grid grid-cols-2 gap-1'>
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
                            <Input placeholder={userData.firstName}/>
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
                            <Input placeholder={userData.lastName}/>
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
                        <Input placeholder={userData.email}/>
                    </Form.Item>

                    <div className='grid grid-cols-2 gap-1'>
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
                            <Option value='headmaster'>Teacher</Option>
                            <Option value='headmaster'>Student</Option>
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

export default Edit;