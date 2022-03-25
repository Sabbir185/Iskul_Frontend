import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import AdminLayout from '../../../layout/adminLayout';
import { useUser } from '../../../contexts/userContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

const AddSubject = () => {
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (values) => {
        values.school = user.schoolId._id;
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await axios.post('http://localhost:8080/api/subject/create', values, config);
            if (res.data.status == true) {
                message.success('Subject added successfully');
                setTimeout(() => {
                    router.push('/school/courses/view-all')
                }, 2000);
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
                <h1 className='text-center pt-6 font-semibold text-lg text-cyan-800'>Add Subject</h1>
                <div className='w-11/12 md:w-1/2 mx-auto mt-8 bg-slate-200 shadow-lg p-10 rounded-lg'>
                    <Form onFinish={onSubmit} layout='vertical'>

                        <Form.Item label='Subject Name' name="name" rules={[{ required: true, message: 'Enter Subject Name' }, { min: 3, message: 'Need minimum 3 characters' }]} hasFeedback>
                            <Input placeholder='name' />
                        </Form.Item>

                        <Form.Item label='Subject Code' name="code" rules={[{ required: true, message: 'Enter Subject Code' }, { min: 2, message: 'Need minimum 2 characters' }]} hasFeedback>
                            <Input placeholder='code' />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>Add</Button>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddSubject;