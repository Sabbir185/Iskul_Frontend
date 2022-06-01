import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Modal, Spin } from 'antd';
import { deleteClass } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useUser } from '../../../contexts/userContext';
import ClassDetails from '../../../components/modal/class-details';
import { FaEdit, FaTrashAlt } from "react-icons/fa";



const ViewClasses = () => {
    const { user } = useUser();
    const router = useRouter()
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (!!user) {
            async function getData() {
                const id = user?.schoolId?._id;
                if (!!id) {
                    try {
                        const result = await axios.get(`http://localhost:8080/api/class/filtered-by-school/${id}`);
                        setClasses(result.data.classes);

                    } catch (error) {
                        message.error("Something Wrong!");
                    }
                }
            }
            getData()
        }

    }, [user])


    const editHandler = (className, id) => {
        router.push(`/school/class/${className}/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteClass(id)
        if (res.status) {
            message.success(res.message);
            setTimeout(() => {
                router.push('/school')
            }, 3000);
        }
    }

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [classId, setClassId] = useState(null);
    const showModal = (id) => {
        setClassId(id)
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    }


    // column and row data
    const column = [
        {
            dataField: 'name', headerName: 'Class Name', formatter: (name, data) => (
                <p className='text-cyan-500 cursor-pointer' onClick={() => showModal(data._id)}>{name}</p>
            )
        },
        {
            dataField: 'createdAt', headerName: 'Created', formatter: (createdAt, data) =>
                (<p>{new Date(createdAt).toLocaleDateString()}</p>)

        },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div className='flex items-center justify-evenly'>
                    <p onClick={() => editHandler(data.name, _id)} className='text-cyan-600 cursor-pointer' title="Edit"><FaEdit/></p>
                    <p onClick={() => deleteHandler(_id)} className='text-red-600 cursor-pointer' title="Delete"><FaTrashAlt/></p>
                </div>
            )
        },
    ]
    

    return (
        <AdminLayout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Class List</h1>
            <Table data={classes} columns={column} />

            {
                !!classId &&
                <Modal title="Class Details" visible={isModalVisible} onCancel={handleCancel} footer={null} >
                    <ClassDetails id={classId} />
                </Modal>
            }
        </AdminLayout>
    );
};

export default ViewClasses;