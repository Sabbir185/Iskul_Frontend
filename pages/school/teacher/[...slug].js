import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import AdminLayout from '../../../layout/adminLayout';
import { useUser } from '../../../contexts/userContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'


const EditTeacher = () => {
    const router = useRouter();
    const { user } = useUser();
    const firstName = router.query?.slug ? router.query.slug[0] : '';
    const lastName = router.query?.slug ? router.query.slug[1] : '';
    const email = router.query?.slug ? router.query.slug[2] : '';
    const userId = router.query?.slug ? router.query.slug[3] : '';


    const onSubmit = async (values) => {
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await axios.put(`http://localhost:8080/api/user/update/${userId}`, values, config);
            if (res.data.status == true) {
                message.success(res.data.message);
                setTimeout(() => {
                    router.push('/school/teacher/view-all')
                }, 2500);
            }

        } catch (error) {
            if (error.response.data.message) {
                message.error(error.response.data.message);

            } else {
                message.error("Failed, maybe you're not authorized!");
            }
        }
    }


    return (
        <AdminLayout>
            <div className='bg-slate-300 h-screen p-0 m-0'>
                <h1 className='text-center pt-6 font-semibold text-lg text-cyan-800'>Update Teacher Information</h1>
                <div className='w-11/12 md:w-1/2 mx-auto mt-8 bg-slate-200 shadow-lg p-10 rounded-lg'>
                    <Form onFinish={onSubmit} layout='vertical'>

                        <Form.Item label='First Name' name="firstName" hasFeedback>
                            <Input placeholder={firstName} />
                        </Form.Item>

                        <Form.Item label='Last Name' name="lastName" hasFeedback>
                            <Input placeholder={lastName} />
                        </Form.Item>
                        <Form.Item label='Email' name="email" hasFeedback>
                            <Input placeholder={email} />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>Update</Button>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditTeacher;