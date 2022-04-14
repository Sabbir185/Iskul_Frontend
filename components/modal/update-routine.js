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

    const [checkDuplicate, setCheckDuplicate] = useState([]);
    const [checkByDay, setCheckByDay] = useState(null);
    const [checkByTime, setCheckByTime] = useState(null);

    const handleDays = (day) => {
        setCheckByDay(day)
    }
    const handleTimes = (time) => {
        setCheckByTime(time)
    }

    // duplicate data fetching
    useEffect(() => {
        const schoolId = user?.schoolId?._id
        if (!!schoolId) {
            async function duplicationCheck() {
                try {
                    const data = {
                        day: checkByDay,
                        school: schoolId
                    }
                    const res = await axios.post(`http://localhost:8080/api/routine/checking-duplication`, data);

                    if (res.data.status === true) {
                        setCheckDuplicate(res.data.matched)
                    }

                } catch (error) {
                    message.error(error.response.data.message)
                }
            }
            duplicationCheck();
        }
    }, [checkByDay, user?.schoolId?._id])


    // checking day, time and room to avoid conflict
    let clsTime = []
    let clsRoom = []
    let teacherInfo = [];
    checkDuplicate?.map(el => {
        const schedule = el?.schedules

        schedule?.map(data => {
            // taking rooms, according to time and day
            if (data.class_time === checkByTime && data.day === checkByDay) {
                clsRoom.push(data.class_room)

                // just for title, who actually occupied the room ?
                if (data.day === checkByDay) {
                    teacherInfo.push(el.teacher.firstName + " " + el.teacher.lastName)
                }
            }

            // taking current teacher time, according to day
            if (data.day === checkByDay && user._id === el.teacher._id) {
                clsTime.push(data.class_time)
            }
        })
    })

    teacherInfo.length > 0 && teacherInfo.reverse()


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
        let data;
        if (routineData?.schedules?.length === 1) {
            const { day0, class_time0, class_room0 } = values;
            data = [{ day: day0, class_time: class_time0, class_room: class_room0 }]

        } else if (routineData?.schedules?.length === 2) {
            const { day0, class_time0, class_room0, day1, class_time1, class_room1 } = values;
            data = [
                { day: day0, class_time: class_time0, class_room: class_room0 },
                { day: day1, class_time: class_time1, class_room: class_room1 },
            ]

        } else if (routineData?.schedules?.length === 3) {
            const { day0, class_time0, class_room0,
                day1, class_time1, class_room1,
                day2, class_time2, class_room2
            } = values;
            data = [
                { day: day0, class_time: class_time0, class_room: class_room0 },
                { day: day1, class_time: class_time1, class_room: class_room1 },
                { day: day2, class_time: class_time2, class_room: class_room2 },
            ]

        } else if (routineData?.schedules?.length === 4) {
            const { day0, class_time0, class_room0,
                day1, class_time1, class_room1,
                day2, class_time2, class_room2,
                day3, class_time3, class_room3,
            } = values;
            data = [
                { day: day0, class_time: class_time0, class_room: class_room0 },
                { day: day1, class_time: class_time1, class_room: class_room1 },
                { day: day2, class_time: class_time2, class_room: class_room2 },
                { day: day3, class_time: class_time3, class_room: class_room3 },
            ]

        } else if (routineData?.schedules?.length === 5) {
            const { day0, class_time0, class_room0,
                day1, class_time1, class_room1,
                day2, class_time2, class_room2,
                day3, class_time3, class_room3,
                day4, class_time4, class_room4,
            } = values;
            data = [
                { day: day0, class_time: class_time0, class_room: class_room0 },
                { day: day1, class_time: class_time1, class_room: class_room1 },
                { day: day2, class_time: class_time2, class_room: class_room2 },
                { day: day4, class_time: class_time4, class_room: class_room4 },
            ]

        } else if (routineData?.schedules?.length === 6) {
            const { day0, class_time0, class_room0,
                day1, class_time1, class_room1,
                day2, class_time2, class_room2,
                day3, class_time3, class_room3,
                day4, class_time4, class_room4,
                day5, class_time5, class_room5,
            } = values;
            data = [
                { day: day0, class_time: class_time0, class_room: class_room0 },
                { day: day1, class_time: class_time1, class_room: class_room1 },
                { day: day2, class_time: class_time2, class_room: class_room2 },
                { day: day5, class_time: class_time5, class_room: class_room5 },
            ]

        }

        if (!!id) {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const res = await axios.patch(`http://localhost:8080/api/routine/update/${id}`, data, config)

                if (res.data.status === true) {
                    message.success(res.data.message)
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
                                <Select style={{ width: '120px' }} placeholder='select day' onChange={handleDays}>
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

                                <Select style={{ width: '150px' }} placeholder='select class time' showArrow={false} onChange={handleTimes}>
                                    {
                                        classTimes?.map((classTime, i) => <Option
                                            key={i}
                                            value={classTime}
                                            disabled={clsTime?.includes(classTime) ? true : false}
                                            title={clsTime?.includes(classTime) && "You've already taken"}
                                        >
                                            {classTime}
                                        </Option>)
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
                                        classRooms?.map((classRoom, i) => <Option
                                            key={i}
                                            value={classRoom}
                                            disabled={clsRoom?.includes(classRoom) ? true : false}
                                        >
                                            {classRoom}
                                        </Option>)
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