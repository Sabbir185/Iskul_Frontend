import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, Button, Select, message } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useUser } from '../../../contexts/userContext';
import { getAllClassRoomBySchoolId } from '../../../data/class-room-api';
import { getAllClassTimeBySchoolId } from '../../../data/class-time-api';


const UpdateClass = () => {
    const { user } = useUser();
    const router = useRouter();
    const className = router?.query?.slug[0] || '';
    const classID = router?.query?.slug[1] || '';

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

    // update class
    const onFinish = (values) => {
        async function createClass() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.patch(`http://localhost:8080/api/class/update/${classID}`, values, config);

                if (response.data.status === true) {
                    message.success(response.data.message);
                    setTimeout(() => {
                        router.push('/school/class/view-classes')
                    }, 2000);
                }

            } catch (error) {
                if (error.response.data.message) {
                    message.error(error.response.data.message);

                } else {
                    message.warning("Failed, maybe you're not authorized!");
                }
            }
        }
        createClass()
    };


    // handle class rooms section
    const classRoomSelectedData = [];
    for (let i = 0; i < classRooms.length; i++) {
        classRoomSelectedData.push(<Option key={i} value={classRooms[i]}>{classRooms[i]}</Option>);
    }

    // handle class times section
    const classTimeSelectedData = [];
    for (let i = 0; i < classTimes.length; i++) {
        classTimeSelectedData.push(<Option key={i} value={classTimes[i]}>{classTimes[i]}</Option>);
    }



    return (
        <AdminLayout>
            <div className='bg-slate-300 h-full pb-10'>
                <h1 className='text-center py-2 font-semibold text-lg text-cyan-800'>Update Class</h1>
                <div className='m-auto bg-slate-200 rounded-lg p-10 shadow-lg font-semibold md:w-3/5 h-auto'>

                    <Form onFinish={onFinish} layout='vertical'>
                        <Form.Item
                            label="Class Name"
                            name="name"
                        >
                            <Input placeholder={className} />
                        </Form.Item>

                        <Form.Item name="class_rooms" label="Select Class Rooms">

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='class rooms'>
                                {classRoomSelectedData}
                            </Select>

                        </Form.Item>

                        <Form.Item name="class_times" label="Select Class Times">

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='class times' showArrow={false}>
                                {classTimeSelectedData}
                            </Select>

                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UpdateClass;
