import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import AddRoutine from './add-routine';
import { useUser } from '../../../contexts/userContext';
import { Button, Form, Input, message, Select, Modal } from 'antd';
const { Option } = Select;
import axios from 'axios';
import { useRouter } from 'next/router'
import ClassRoutineView from '../../../components/classRoutineView';


const Routine = () => {
    const { user } = useUser();
    const router = useRouter();
    const [classData, setClassData] = useState(null);
    const [classID, setClassId] = useState(null);

    // data fetched by school and teacher id
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


    // catch classID
    const handleChange = (id) => {
        setClassId(id)
    }


    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    }


    return (
        <AdminLayout>

            {/* routine add */}
            <section className='text-cyan-900 md:flex md:flex-row md:items-center md:justify-around '>
                <div>
                    <p className='font-semibold text-lg'>Routine Management</p>

                </div>
                <div className='flex items-center gap-3'>
                    <p>Add Routine</p>
                    <p className='' onClick={showModal}>
                        <PlusCircleFilled className='text-xl hover:scale-125 transition cursor-pointer' />
                    </p>
                </div>

            </section>


            {/* select class, options */}
            <section className='md:mx-10'>
                <Form layout='vertical'>
                    <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback>
                        <Select placeholder='Class Options' onChange={handleChange}>
                            {
                                classData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
                            }
                        </Select>
                    </Form.Item>

                </Form>
            </section>


            {/* view class routine */}
            <section>
                <ClassRoutineView id={classID} />
            </section>


            <Modal title="Create Routine" visible={isModalVisible} onCancel={handleCancel} footer={null} >
                <AddRoutine handleCancel={handleCancel} />
            </Modal>
        </AdminLayout>
    );
};

export default Routine;