import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import axios from 'axios';
import { useUser } from '../../contexts/userContext';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { getAllClassRoomBySchoolId } from '../../data/class-room-api';
import { getAllClassTimeBySchoolId } from '../../data/class-time-api';


const AddRoutine = ({ handleCancel }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { user } = useUser()
    const [classesData, setClassData] = useState(null);
    const [filteredSubject, setFilteredSubject] = useState([]);
    const [classRooms, setClassRooms] = useState([]);
    const [classTimes, setClassTimes] = useState([]);


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

    // fetch class rooms
    useEffect(() => {
        const schoolId = user?.schoolId?._id;
        if (!!schoolId) {
            const getRooms = async () => {
                const res = await getAllClassRoomBySchoolId(schoolId);
                setClassRooms(res.class_rooms.class_rooms)
            }
            getRooms();
        }
    }, [user?.schoolId?._id])

    // fetch class times
    useEffect(() => {
        const schoolId = user?.schoolId?._id;
        if (!!schoolId) {
            const getTimes = async () => {
                const res = await getAllClassTimeBySchoolId(schoolId);
                setClassTimes(res.class_times.class_times)
            }
            getTimes();
        }
    }, [user?.schoolId?._id])


    // submit or post routine data
    const handleSubmit = async (values) => {
        const { class_name, subject, schedules } = values;
        const teacher = user?._id;
        const school = user?.schoolId?._id;
        const sendData = {
            class_name, subject, teacher, school, schedules
        }

        console.log(sendData)

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
        const targetClass = classesData?.find(data => data._id === id);
        const teacherClassInfo = targetClass?.class_info?.filter(info => info.teachers._id === user._id)

        // filter subject according to teacher which was set by headmaster/admin
        setFilteredSubject(teacherClassInfo)
    }

    const [days, setDays] = useState(0)
    const handleDaysOfWeek = (id) => {
        const daysInfo = filteredSubject?.find(info => info.subjects._id === id)
        setDays(daysInfo.days)
    }


    return (
        <div>
            <Form
                onFinish={handleSubmit}
                layout='vertical'
                form={form}
            >

                <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback>
                    <Select placeholder='Class' onChange={handleChange}>
                        {
                            classesData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item name="subject" label="Select Subject" rules={[{ required: true, message: 'Please Select Subject' }]} hasFeedback>
                    <Select style={{ width: '100%' }} placeholder='Subject' onChange={handleDaysOfWeek}>
                        {
                            filteredSubject?.map((data, i) => <Option key={i} value={data.subjects._id}>{data.subjects.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <p className='text-green-600'><em>Set <span className='font-bold'>{days}</span> days schedule/week</em></p>

                <Form.List name="schedules">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} className='block' align="baseline">
                                    <div className='md:flex md:gap-3'>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'day']}
                                            rules={[{ required: true, message: 'Please Select Day' }]}
                                            hasFeedback
                                        >
                                            <Select style={{ width: '120px' }} placeholder='select day'>
                                                <Option value='Saturday'>Saturday</Option>
                                                <Option value='Sunday'>Sunday</Option>
                                                <Option value='Monday'>Monday</Option>
                                                <Option value='Tuesday'>Tuesday</Option>
                                                <Option value='Wednesday'>Wednesday</Option>
                                                <Option value='Thursday'>Thursday</Option>
                                                <Option value='Friday'>Friday</Option>
                                            </Select>
                                        </Form.Item>


                                        <Form.Item
                                            {...restField}
                                            name={[name, 'class_time']}
                                            rules={[{ required: true, message: 'Please Select Time' }]}
                                            hasFeedback
                                        >

                                            <Select style={{ width: '150px' }} placeholder='select class time' showArrow={false}>
                                                {
                                                    classTimes?.map((classTime, i) => <Option key={i} value={classTime}>{classTime}</Option>)
                                                }
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'class_room']}
                                            rules={[{ required: true, message: 'Please Select Room' }]}
                                            hasFeedback
                                        >

                                            <Select style={{ width: '150px' }} placeholder='select class room'>
                                                {
                                                    classRooms?.map((classRoom, i) => <Option key={i} value={classRoom}>{classRoom}</Option>)
                                                }
                                            </Select>

                                        </Form.Item>
                                    </div>

                                    <p className='text-red-500 font-bold'><MinusCircleOutlined onClick={() => remove(name)} /></p>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    <span className='text-green-700'> + Add Class Schedule</span>

                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>


                <Button type="primary" htmlType='submit'>Create</Button>
            </Form>
        </div>
    );
};

export default AddRoutine;