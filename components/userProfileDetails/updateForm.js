import React, { useEffect } from 'react';
import { Form, Input, Button, Upload, } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useUser } from '../../contexts/userContext';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'


const InfoUpdateForm = ({ }) => {
    const router = useRouter()
    const { user } = useUser()
    const { firstName, lastName, email } = user;

    const onFinish = async (values) => {
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await axios.patch('http://localhost:8080/api/user/update-profile', values, config)

            if (res.data.message === 'success') {
                toast.success('Profile Updated Successfully!');
                setTimeout(() => {
                    window.location.reload()
                }, 2700);
            }

        } catch (error) {
            toast.warning('Something went wrong! try again');
        }
    };




    return (
        <div className='m-auto bg-gray-50 rounded-lg p-10 shadow-md font-semibold w-11/12'>
            <ToastContainer
                position="top-center"
                autoClose={2600}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >

                <Form.Item
                    label="First Name"
                    name="firstName"
                >
                    <Input placeholder={firstName} />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                >
                    <Input placeholder={lastName} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input placeholder={email} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default InfoUpdateForm;