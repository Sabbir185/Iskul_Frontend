import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { deleteNotice } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useUser } from '../../../contexts/userContext'
import { CloudDownloadOutlined, DeleteOutlined } from '@ant-design/icons'


const ViewAllNotice = () => {
    const { user } = useUser();
    const router = useRouter()
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        if (!!user) {
            async function getData() {
                const id = user?.schoolId?._id;
                if (!!id) {
                    try {
                        const result = await axios.get(`http://localhost:8080/api/notice/filtered-subject/${id}`);
                        setNotices(result.data.notices);

                    } catch (error) {
                        if (error.response.data.message) {
                            message.error(error.response.data.message);

                        } else {
                            message.warning("Failed, maybe you're not authorized!");
                        }
                    }
                }
            }
            getData()
        }
    }, [user])


    const downloadHandler = (link) => {
        router.push(`http://localhost:8080/${link}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteNotice(id)
        if (res.status) {
            message.success(res.message);
            setTimeout(() => {
                router.push('/school')
            }, 3000);
        }
    }

    const column = [
        {
            dataField: 'title', headerName: 'Title', formatter: (name, data) => (
                <p>{name}</p>
            )
        },
        {
            dataField: 'createdAt', headerName: 'Published', formatter: (createdAt, data) => (
                <p>{new Date(createdAt).toLocaleDateString()}</p>
            )
        },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div className='grid grid-cols-2 gap-1 place-content-center'>
                    <p onClick={() => downloadHandler(data.file)} className='block text-xl text-green-500 cursor-pointer font-bold' title='download'> <CloudDownloadOutlined /> </p>
                    <p onClick={() => deleteHandler(_id)} className='block font-bold text-xl text-red-500 cursor-pointer' title="delete"><DeleteOutlined /></p>
                </div>
            )
        },
    ]


    return (
        <AdminLayout>
            <div className='bg-slate-200 rounded-md pt-5 h-screen'>
                <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Notice List</h1>
                <Table data={notices} columns={column} />
            </div>
        </AdminLayout>
    );
};

export default ViewAllNotice;