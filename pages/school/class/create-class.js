import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import AdminLayout from '../../../layout/adminLayout';
import { getAllClassRoomBySchoolId } from '../../../data/class-room-api';
import { getAllClassTimeBySchoolId } from '../../../data/class-time-api';
import { useUser } from '../../../contexts/userContext';
import { getAllSubjectBySchoolId } from '../../../data/subject-api';
import { getAllTeacherBySchoolId } from '../../../data/user-api';
import { createNewClass } from '../../../data/class-api';
import { useRouter } from 'next/router'

const CreateClass = () => {
    const { user } = useUser();
    const router = useRouter();
    const [classRooms, setClassRooms] = useState([]);
    const [classTimes, setClassTimes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const daysByWeek = [1, 2, 3, 4, 5, 6, 7]


    const onFinish = async (values) => {
        values.school = user?.schoolId?._id;
        const res = await createNewClass(values);
        if (res.status) {
            message.success(res.message)
            setTimeout(() => {
                router.push('/school/class/view-classes')
            }, 2500);

        } else {
            message.error(res)
        }
    };

    // fetching all subject according to school
    useEffect(() => {
        const schoolId = user?.schoolId?._id;
        if (!!schoolId) {
            const getSubjects = async () => {
                const res = await getAllSubjectBySchoolId(schoolId);
                setSubjects(res)
            }
            getSubjects();
        }
    }, [user?.schoolId?._id])

    // fetching all teacher according to school
    useEffect(() => {
        const schoolId = user?.schoolId?._id;
        if (!!schoolId) {
            const getTeachers = async () => {
                const res = await getAllTeacherBySchoolId(schoolId);
                setTeachers(res)
            }
            getTeachers();
        }
    }, [user?.schoolId?._id])

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
            <section className='bg-slate-200 rounded-lg h-full pb-10'>
                <h1 className='text-center py-2 font-semibold text-lg text-cyan-800'>Create New Class</h1>
                <div className='m-auto bg-slate-100 rounded-lg p-10 shadow-lg font-semibold md:w-11/12 h-auto'>
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" layout='vertical'>
                        <Form.Item
                            label="Class Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Class Name!',
                                },
                            ]}
                        >
                            <Input placeholder='enter name' />
                        </Form.Item>

                        <Form.List name="class_info">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} className='block' align="baseline">
                                            <div className='md:flex md:gap-5'>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'subjects']}
                                                >

                                                    <Select style={{ width: '240px' }} tokenSeparators={[',']} placeholder='select subject'>
                                                        {
                                                            subjects?.map(subject => <Option key={subject._id} value={subject._id}>{subject.name}</Option>)
                                                        }
                                                    </Select>

                                                </Form.Item>


                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'teachers']}
                                                >

                                                    <Select style={{ width: '240px' }} tokenSeparators={[',']} placeholder='select teacher' showArrow={false}>
                                                        {
                                                            teachers?.map(teacher => <Option key={teacher._id} value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>)
                                                        }
                                                    </Select>

                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'days']}
                                                >

                                                    <Select style={{ width: '240px' }} tokenSeparators={[',']} placeholder='select number of days/week'>
                                                        {
                                                            daysByWeek?.map((day, i) => <Option key={i} value={day}>{day}</Option>)
                                                        }
                                                    </Select>

                                                </Form.Item>
                                            </div>

                                            <p className='text-red-500 font-bold'><MinusCircleOutlined onClick={() => remove(name)} /></p>
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block>
                                            <span className='text-green-700'> + Add teacher & subject</span>

                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item name="class_rooms" label="Select Class Rooms" rules={[{ required: true, message: 'Please select class rooms' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='class rooms'>
                                {classRoomSelectedData}
                            </Select>

                        </Form.Item>

                        <Form.Item name="class_times" label="Select Class Times" rules={[{ required: true, message: 'Please class times' }]}>

                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder='class times' showArrow={false}>
                                {classTimeSelectedData}
                            </Select>

                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </AdminLayout>
    );
};


export default CreateClass