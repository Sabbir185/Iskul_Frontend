import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../layout/adminLayout';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'


const Edit = () => {
    const [schoolData, setSchoolData] = useState({})
    const router = useRouter();
    const schoolId = router.query.id;
    const token = Cookies.get('token');

    const onFinish = async (values) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.patch(`http://localhost:8080/api/school/update/${schoolId}`, values, config)
            if (response.data) {
                alert("Update Successful!")
                router.push('/admin')
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const schoolGet = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/school/${schoolId}`);
                setSchoolData(response.data.school)

            } catch (error) {
                console.log(error.response.data)
            }
        }
        schoolGet()
    }, [schoolId])


    return (
        <AdminLayout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Update School Information</h1>

            <div className='m-auto bg-green-200 rounded-lg p-10 shadow-md font-semibold' style={{ width: '60%' }}>
                <Form
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="School Name"
                        name="schoolName"
                    >
                        <Input placeholder={schoolData.schoolName}/>
                    </Form.Item>

                    <Form.Item
                        label="Established Date"
                        name="established"
                    >
                        <Input type='number' placeholder={schoolData.established}/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="schoolEmail"
                    >
                        <Input placeholder={schoolData.schoolEmail}/>
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