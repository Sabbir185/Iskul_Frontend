import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';


const PasswordChange = ({ setIsModalVisible }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values)
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await axios.patch('http://localhost:8080/api/user/change-password', values, config)

            if (res.data.status === true) {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                setTimeout(() => {
                    setIsModalVisible(false)   // for modal close
                    form.resetFields()
                }, 3000);
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    return (
        <div className=''>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
                form={form} name="control-hooks"
            >
                <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Current Password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter current password' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Password' />
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
                    <Input.Password placeholder='Enter password again' />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>

            </Form>
        </div>
    );
};

export default PasswordChange;