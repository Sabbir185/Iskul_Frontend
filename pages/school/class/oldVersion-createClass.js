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


const DemoClass = () => {
    const { user } = useUser();
    const router = useRouter();
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classRooms, setClassRooms] = useState([]);
    const [classTimes, setClassTimes] = useState([]);
    const daysByWeek = [1,2,3,4,5,6,7]

    // fetching all subject
    useEffect(() => {
        async function schools() {
            try {
                const res = await axios.get('http://localhost:8080/api/subject/get-all');
                setSubjects(res.data.subjects)

            } catch (error) {
                alert(error.response.data.message)
            }
        }
        schools()
    }, [])

    // fetching all teacher
    useEffect(() => {
        const schoolId = user?.schoolId?._id;
        if (!!schoolId) {
            async function teachersData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
                try {
                    const res = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=teacher&schoolId=${schoolId}`, config, token);
                    setTeachers(res.data.data)

                } catch (error) {
                    alert(error.response.data.message)
                }
            }
            teachersData()
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


    // create class
    const onFinish = (values) => {
        console.log(values)
        // values.school = user?.schoolId?._id;
        // async function createClass() {
        //     try {
        //         const token = await Cookies.get('token');
        //         const config = {
        //             headers: { Authorization: `Bearer ${token}` }
        //         }
        //         const response = await axios.post('http://localhost:8080/api/class/create', values, config);

        //         if (response.data.status === true) {
        //             message.success('New Class Created Successfully!');
        //             setTimeout(() => {
        //                 router.push('/school/class/view-classes')
        //             }, 2000);
        //         }

        //     } catch (error) {
        //         if (error.response.data.message) {
        //             message.error(error.response.data.message);

        //         } else {
        //             message.warning("Failed, maybe you're not authorized!");
        //         }
        //     }
        // }
        // createClass()
    };


    // handle subjects section
    const subjectSelectedData = [];
    for (let i = 0; i < subjects.length; i++) {
        subjectSelectedData.push(<Option key={i} value={subjects[i]._id}>{subjects[i].name}</Option>);
    }

    // handle teachers section
    const teacherSelectedData = [];
    for (let i = 0; i < teachers.length; i++) {
        teacherSelectedData.push(<Option key={i} value={teachers[i]._id}>{teachers[i].firstName + ' ' + teachers[i].lastName}</Option>);
    }

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

    // handle class days/week section
    const selectNumberOfDaysByWeek = [];
    for (let i = 0; i < daysByWeek.length; i++) {
        selectNumberOfDaysByWeek.push(<Option key={i} value={daysByWeek[i]}>{daysByWeek[i]}</Option>);
    }


    return (
        <AdminLayout>
            <div className='bg-slate-300 h-full pb-10'>
                <h1 className='text-center py-2 font-semibold text-lg text-cyan-800'>Create New Class</h1>
                <div className='m-auto bg-slate-200 rounded-lg p-10 shadow-lg font-semibold md:w-3/5 h-auto'>

                    <Form onFinish={onFinish} layout='vertical'>
                        <Form.Item
                            label="Class Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Department Name!',
                                },
                            ]}
                        >
                            <Input placeholder='Name' />
                        </Form.Item>


                        <Form.Item name="subjects" label="Select Subjects" rules={[{ required: true, message: 'Please Select subjects' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='Subjects'>
                                {subjectSelectedData}
                            </Select>

                        </Form.Item>


                        <Form.Item name="teachers" label="Select Teachers" rules={[{ required: true, message: 'Please Select teachers' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='Teachers'>
                                {teacherSelectedData}
                            </Select>

                        </Form.Item>


                        <Form.Item name="days" label="Select Number Of Days/Week" rules={[{ required: true, message: 'Please Select Active days' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='Days/week'>
                                {selectNumberOfDaysByWeek}
                            </Select>

                        </Form.Item>


                        <Form.Item name="class_rooms" label="Select Class Rooms" rules={[{ required: true, message: 'Please select class rooms' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='class rooms'>
                                {classRoomSelectedData}
                            </Select>

                        </Form.Item>

                        
                        <Form.Item name="class_times" label="Select Class Times" rules={[{ required: true, message: 'Please class times' }]}>

                            <Select mode="multiple" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='class times' showArrow={false}>
                                {classTimeSelectedData}
                            </Select>

                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DemoClass;
