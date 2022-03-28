import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
const { Option } = Select;
import axios from 'axios';
import { useUser } from '../../contexts/userContext';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


const AddRoutine = ({ handleCancel }) => {
    const router = useRouter();
    const { user } = useUser()
    const [classesData, setClassData] = useState(null);
    const [filteredSubject, setFilteredSubject] = useState(null);


    // class data fetched by school and teacher id
    useEffect(() => {
        if (!!user) {
            const teacherId = user?._id
            const schoolId = user?.schoolId?._id
            if (!!teacherId && !!schoolId) {
                const getClassData = async () => {
                    try {
                        const res = await axios.get(`http://localhost:8080/api/class/get-assigned-class?teacherId=${teacherId}&schoolId=${schoolId}`);

                        if (res.data.status === true) {
                            setClassData(res.data.classes)
                        }

                    } catch (error) {
                        message.error(error.response.data.message)
                    }
                }
                getClassData();
            }
        }
    }, [user])


    // submit or post data
    const handleSubmit = async (values) => {
        const { class_name, subject, day1, day2, class_time1, class_time2 } = values;
        const teacher = user?._id;
        const school = user?.schoolId?._id;
        const day1_time = [day1, class_time1]
        const day2_time = [day2, class_time2]
        const sendData = {
            class_name, subject, teacher, school, day1_time, day2_time
        }

        if (!!user) {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const res = await axios.post(`http://localhost:8080/api/routine/create`, sendData, config)

                if (res.data.status === true) {
                    message.success(res.data.message)
                    handleCancel()
                    setTimeout(() => {
                        router.push('/teacher')
                    }, 2700);
                }

            } catch (error) {
                if (error.response.data.message) {
                    message.success(error.response.data.message)
                } else {
                    message.success(error.message)
                }
            }
        }
    }


    const handleChange = (id) => {
        const subjectsData = classesData.find(data => data._id === id)
        setFilteredSubject(subjectsData)
    }


    return (
        <div>
            <Form onFinish={handleSubmit} layout='vertical'>

                <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback>
                    <Select placeholder='Class' onChange={handleChange}>
                        {
                            classesData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item name="subject" label="Select Subject" rules={[{ required: true, message: 'Please Select Subject' }]} hasFeedback>
                    <Select style={{ width: '100%' }} placeholder='Subject'>
                        {
                            filteredSubject?.subjects?.map((sub, i) => <Option key={i} value={sub._id}>{sub.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <div className='md:grid md:grid-cols-2 md:gap-2'>
                    <Form.Item name="day1" label="Select Day1" rules={[{ required: true, message: 'Please Select Day1' }]} hasFeedback>
                        <Select style={{ width: '100%' }} placeholder='Day1'>
                            <Option value='Saturday'>Saturday</Option>
                            <Option value='Sunday'>Sunday</Option>
                            <Option value='Monday'>Monday</Option>
                            <Option value='Tuesday'>Tuesday</Option>
                            <Option value='Wednesday'>Wednesday</Option>
                            <Option value='Thursday'>Thursday</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="day2" label="Select Day2" rules={[{ required: true, message: 'Please Select Day2' }]} hasFeedback>
                        <Select style={{ width: '100%' }} placeholder='Day2'>
                            <Option value='Saturday'>Saturday</Option>
                            <Option value='Sunday'>Sunday</Option>
                            <Option value='Monday'>Monday</Option>
                            <Option value='Tuesday'>Tuesday</Option>
                            <Option value='Wednesday'>Wednesday</Option>
                            <Option value='Thursday'>Thursday</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className='md:grid md:grid-cols-2 md:gap-2'>
                    <Form.Item name="class_time1" label="Day1 Time" rules={[{ required: true, message: 'Please Select Class Time' }]} hasFeedback>
                        <Select placeholder='Class Time'>
                            <Option value='09:00 AM'>09:00 AM</Option>
                            <Option value='10.30 AM'>10.30 AM</Option>
                            <Option value='12:00 PM'>12:00 PM</Option>
                            <Option value='02:00 PM'>02:00 PM</Option>
                            <Option value='03:30 PM'>03:30 PM</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="class_time2" label="Day2 Time" rules={[{ required: true, message: 'Please Select Class Time' }]} hasFeedback>
                        <Select placeholder='Class Time'>
                            <Option value='09:00 AM'>09:00 AM</Option>
                            <Option value='10.30 AM'>10.30 AM</Option>
                            <Option value='12:00 PM'>12:00 PM</Option>
                            <Option value='02:00 PM'>02:00 PM</Option>
                            <Option value='03:30 PM'>03:30 PM</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Button type="primary" htmlType='submit'>Create</Button>
            </Form>
        </div>
    );
};

export default AddRoutine;