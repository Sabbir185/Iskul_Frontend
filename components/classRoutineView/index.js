import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, LeftCircleOutlined } from '@ant-design/icons';
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


    const [routineID, setRoutineID] = useState(null);

    // actions
    const editHandler = (id) => {
        setRoutineID(id)

        const tableToggler = document.querySelector("#tableToggle");
        const updateToggler = document.querySelector("#updateToggle");

        tableToggler.getAttribute('layout') === 'TBToggle'
            ? tableToggler.removeAttribute('layout')
            : tableToggler.setAttribute('layout', 'TBToggle')

        updateToggler.getAttribute('layout') === 'UpToggle'
            ? updateToggler.removeAttribute('layout')
            : updateToggler.setAttribute('layout', 'UpToggle')
    }


    const deleteHandler = async (id) => {
        const res = await deleteRoutine(id)
        if (res.status) {
            message.success(res.message)
        }
    }


    const column = [
        {
            dataField: 'subject', headerName: 'Subject', formatter: (_, data) => (
                <p className='font-mono'>{data.subject.name?.toUpperCase()}</p>)
        },
        {
            dataField: 'teacher', headerName: 'Teacher', formatter: (_, data) => (
                <p className='font-mono'>{data.teacher.firstName + " " + data.teacher.lastName}</p>)
        },

        {
            dataField: '', headerName: 'Day', formatter: (_, data) => (
                data?.schedules?.map((d, i) => <li key={i} className='list-none text-md font-mono'>{d.day}</li>)
            )
        },

        {
            dataField: '', headerName: 'Time', formatter: (_, data) => (
                data?.schedules?.map((t, i) => <li key={i} className='list-none text-md font-mono'>{t.class_time}</li>)
            )
        },

        {
            dataField: '', headerName: 'Room', formatter: (_, data) => (
                data?.schedules?.map((r, i) => <li key={i} className='list-none text-md font-mono'>{r.class_room}</li>)
            )
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


    // just convert array to object
    const ObjectRoutineData = routines.find(el => el._id === routineID)


    return (
        <div>

            <div id="tableToggle">
                <Table data={routines} columns={column} />
            </div>


            {/* update class routine */}
            <div id="updateToggle" className='hidden mx-auto w-2/3 border-2 text-center bg-slate-50 rounded-lg relative'>

                <h1 onClick={editHandler} className='cursor-pointer absolute top-3 left-5 text-cyan-600 flex items-center gap-1'><LeftCircleOutlined />Back</h1>

                <UpdateRoutine id={routineID} routineData={ObjectRoutineData} />

            </div>


        </div>
    );
};

export default ClassRoutineView;