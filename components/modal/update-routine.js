import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
const { Option } = Select;
import axios from 'axios';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


const UpdateRoutine = ({ id, handleCancel, routineData }) => {
    const router = useRouter()
    // update or post data
    const handleSubmit = async (values) => {
        const { day1, day2, class_time1, class_time2 } = values;

        const day1_time = [day1, class_time1]
        const day2_time = [day2, class_time2]
        const sendData = {
            day1_time, day2_time
        }

        
        if (!!id) {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const res = await axios.patch(`http://localhost:8080/api/routine/update/${id}`, sendData, config)

                if (res.data.status === true) {
                    message.success(res.data.message)
                    handleCancel()
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


    const [day1, time1] = routineData[0].day1_time
    const [day2, time2] = routineData[0].day2_time


    return (
        <div>

            <Form onFinish={handleSubmit} layout='vertical'>
                <div className='md:grid md:grid-cols-2 md:gap-2'>
                    <Form.Item name="day1" label="Select Day1" hasFeedback initialValue={day1}>
                        <Select style={{ width: '100%' }}>
                            <Option value='Saturday'>Saturday</Option>
                            <Option value='Sunday'>Sunday</Option>
                            <Option value='Monday'>Monday</Option>
                            <Option value='Tuesday'>Tuesday</Option>
                            <Option value='Wednesday'>Wednesday</Option>
                            <Option value='Thursday'>Thursday</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="day2" label="Select Day2" hasFeedback initialValue={day2}>
                        <Select style={{ width: '100%' }}>
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
                    <Form.Item name="class_time1" label="Day1 Time" hasFeedback initialValue={time1}>
                        <Select>
                            <Option value='09:00 AM'>09:00 AM</Option>
                            <Option value='10.30 AM'>10.30 AM</Option>
                            <Option value='12:00 PM'>12:00 PM</Option>
                            <Option value='02:00 PM'>02:00 PM</Option>
                            <Option value='03:30 PM'>03:30 PM</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="class_time2" label="Day2 Time" hasFeedback initialValue={time2}>
                        <Select>
                            <Option value='09:00 AM'>09:00 AM</Option>
                            <Option value='10.30 AM'>10.30 AM</Option>
                            <Option value='12:00 PM'>12:00 PM</Option>
                            <Option value='02:00 PM'>02:00 PM</Option>
                            <Option value='03:30 PM'>03:30 PM</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Button type="primary" htmlType='submit'>Update</Button>
            </Form>

        </div>
    );
};

export default UpdateRoutine;