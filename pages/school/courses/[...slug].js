import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import AdminLayout from '../../../layout/adminLayout';
import { useUser } from '../../../contexts/userContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'


const EditSubject = () => {
    const router = useRouter();
    const { user } = useUser();
    const subName = router.query.slug[0];
    const code = router.query.slug[1];
    const subID = router.query.slug[2];

    console.log(subID)

    const onSubmit = async (values) => {
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await axios.patch(`http://localhost:8080/api/subject/update/${subID}`, values, config);
            if (res.data.status == true) {
                message.success(res.data.message);
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

                        <Form.Item label='Subject Name' name="name" hasFeedback>
                            <Input placeholder={subName} />
                        </Form.Item>

                        <Form.Item label='Subject Code' name="code" hasFeedback>
                            <Input placeholder={code} />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'>Update</Button>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditSubject;