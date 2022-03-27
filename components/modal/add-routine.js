import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useUser } from '../../contexts/userContext';


const AddRoutine = () => {
    const { user } = useUser()
    const [classesData, setClassData] = useState(null);
    const [subjects, setSubjectData] = useState(null);

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


    // subject data fetched by school id
    useEffect(() => {
        if (!!user) {
            const schoolId = user?.schoolId?._id
            if (!!schoolId) {
                const subjectData = async () => {
                    try {
                        const res = await axios.get(`http://localhost:8080/api/subject/filtered-subject/${schoolId}`);

                        if (res.data.status === true) {
                            setSubjectData(res.data.subjects)
                        }

                    } catch (error) {
                        message.error(error.response.data.message)
                    }
                }
                subjectData();
            }
        }
    }, [user])




    const handleSubmit = (values) => {
        console.log(values)
    }

    console.log('cls - ', classesData)
    console.log('sub - ', subjects)
    // class_name, subject, teacher, school, day, class_time
    return (
        <div>
            <Form onFinish={handleSubmit} layout='vertical'>

                <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback>
                    <Select placeholder='Class'>

                    </Select>
                </Form.Item>

                <Form.Item name="subject" label="Select Subject" rules={[{ required: true, message: 'Please Select Subject' }]} hasFeedback>
                    <Select style={{ width: '100%' }} placeholder='Subject'>

                    </Select>
                </Form.Item>

                <div className='md:grid md:grid-cols-2 md:gap-2'>
                    <Form.Item name="day" label="Select Day1" rules={[{ required: true, message: 'Please Select Day1' }]} hasFeedback>
                        <Select style={{ width: '100%' }} placeholder='Day1'>

                        </Select>
                    </Form.Item>

                    <Form.Item name="day" label="Select Day2" rules={[{ required: true, message: 'Please Select Day2' }]} hasFeedback>
                        <Select style={{ width: '100%' }} placeholder='Day2'>

                        </Select>
                    </Form.Item>
                </div>

                <Form.Item name="class_time" label="Select Time" rules={[{ required: true, message: 'Please Select Class Time' }]} hasFeedback>
                    <Select placeholder='Class Time'>

                    </Select>
                </Form.Item>

                <Button type="primary" htmlType='submit'>Create</Button>
            </Form>
        </div>
    );
};

export default AddRoutine;