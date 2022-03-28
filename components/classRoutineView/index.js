import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import axios from 'axios'
import { useUser } from '../../contexts/userContext';
import Table from '../table/table';
import { deleteRoutine } from '../helper/delete';
import { useRouter } from 'next/router'
import UpdateRoutine from '../modal/update-routine';


const ClassRoutineView = ({ id }) => {
    const { user } = useUser();
    const router = useRouter();
    const [routines, setRoutines] = useState([]);

    // data fetched by school and teacher id
    useEffect(() => {
        if (!!id) {
            const getRoutineData = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/api/routine/filtered-routine/${id}`);

                    if (res.data.status === true) {
                        setRoutines(res.data.routines)
                    }

                } catch (error) {
                    if (error.response.data.message)
                        message.error(error.response.data.message)

                    message.error(error.message)
                }
            }
            getRoutineData();
        }
    }, [id])


    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [routineID, setRoutineID] = useState(null);
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // actions
    const editHandler = (id) => {
        setRoutineID(id)
        setIsModalVisible(true);
    }

    const deleteHandler = async (id) => {
        const res = await deleteRoutine(id)
        if (res.status) {
            message.success(res.message)
            router.push('/teacher')
        }
    }


    const column = [
        {
            dataField: 'subject', headerName: 'Subject', formatter: (_, data) => (
                <p>{data.subject.name?.toUpperCase()}</p>)
        },
        {
            dataField: 'teacher', headerName: 'Teacher', formatter: (_, data) => (
                <p>{data.teacher.firstName + " " + data.teacher.lastName}</p>)
        },

        {
            dataField: 'day1_time', headerName: 'Class Time', formatter: (_, data) => (
                <p>{data.day1_time[0] + ", " + data.day1_time[1]}</p>)
        },

        {
            dataField: 'day2_time', headerName: 'Class Time', formatter: (_, data) => (
                <p>{data.day2_time[0] + ", " + data.day2_time[1]}</p>)
        },


        {
            dataField: '_id', headerName: 'Action', formatter: _id => (
                <div className='md:flex md:items-center md:justify-around text-xl'>
                    <p onClick={() => editHandler(_id)} className='text-green-500 cursor-pointer'><EditOutlined /></p>
                    <p onClick={() => deleteHandler(_id)} className='text-red-500 cursor-pointer'> <DeleteOutlined /></p>
                </div>
            )
        },
    ]


    return (
        <div>
            <Table data={routines} columns={column} />

            {/* update class routine */}
            <Modal title="Update Class Routine" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <UpdateRoutine id={routineID} handleCancel={handleCancel} routineData={routines}/>
            </Modal>
        </div>
    );
};

export default ClassRoutineView;