import React from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';


const Registration = () => {
    const router = useRouter();
    const token = Cookies.get('token');

    const onFinish = async (values) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.post(`http://localhost:8080/api/school/registration`, values, config)

            if (response.data) {
                toast.success('Registration Successfull!');
                setTimeout(() => {
                    router.push('/admin')
                }, 2700);
            }

        } catch (error) {
            console.log(error)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <AdminLayout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Register New School</h1>

            <div className='m-auto bg-green-200 rounded-lg p-10 shadow-md font-semibold' style={{ width: '60%' }}>
                <Form
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="School Name"
                        name="schoolName"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input School Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Established Date"
                        name="established"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Established Year!',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="schoolEmail"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input School Email!',
                            },
                        ]}
                    >
                        <Input />
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

export default Registration;