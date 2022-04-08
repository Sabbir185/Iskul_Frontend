import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Select, Space } from 'antd';
const { Option } = Select;
import axios from 'axios';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { getAllClassRoomBySchoolId } from '../../data/class-room-api';
import { getAllClassTimeBySchoolId } from '../../data/class-time-api';
import { useUser } from '../../contexts/userContext';


const UpdateRoutine = ({ id, routineData }) => {
    const { user } = useUser()
    const [form] = Form.useForm();
    const router = useRouter()
    const [classRooms, setClassRooms] = useState([]);
    const [classTimes, setClassTimes] = useState([]);


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


    // update or post data
    const handleSubmit = async (values) => {
        // const {  } = values;
        let one, two, three, four, five, six, seven;

        for(let i=0; i<routineData?.schedules?.length; i++ ){
            
        }

        console.log(values)
        // const sendData = {

        // }


        // if (!!id) {
        //     try {
        //         const token = await Cookies.get('token');
        //         const config = {
        //             headers: { Authorization: `Bearer ${token}` }
        //         }
        //         const res = await axios.patch(`http://localhost:8080/api/routine/update/${id}`, sendData, config)

        //         if (res.data.status === true) {
        //             message.success(res.data.message)
        //         }

        //     } catch (error) {
        //         if (error.response.data.message) {
        //             message.success(error.response.data.message)
        //         } else {
        //             message.success(error.message)
        //         }
        //     }
        // }
    }

    console.log(routineData)



    return (
        <div className='flex justify-center mt-10 mb-5'>

            <Form form={form} onFinish={handleSubmit} layout='vertical'>
                {
                    routineData?.schedules?.map((data, i) => (
                        <div key={i} className='md:flex md:gap-3'>
                            <Form.Item
                                name={`day${i}`}
                                rules={[{ required: true, message: 'Please Select Day' }]}
                                initialValue={data.day}
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
                                name={`class_time${i}`}
                                rules={[{ required: true, message: 'Please Select Time' }]}
                                initialValue={data.class_time}
                                hasFeedback
                            >

                                <Select style={{ width: '150px' }} placeholder='select class time' showArrow={false}>
                                    {
                                        classTimes?.map((classTime, i) => <Option key={i} value={classTime}>{classTime}</Option>)
                                    }
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name={`class_room${i}`}
                                rules={[{ required: true, message: 'Please Select Room' }]}
                                initialValue={data.class_room}
                                hasFeedback
                            >

                                <Select style={{ width: '150px' }} placeholder='select class room'>
                                    {
                                        classRooms?.map((classRoom, i) => <Option key={i} value={classRoom}>{classRoom}</Option>)
                                    }
                                </Select>

                            </Form.Item>
                        </div>
                    ))
                }

                <Button type="primary" htmlType='submit'>Update</Button>
            </Form>

        </div>
    );
};

export default UpdateRoutine;