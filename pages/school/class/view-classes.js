import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Spin } from 'antd';
import { deleteClass } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import { message } from 'antd';


const ViewClasses = () => {
    const router = useRouter()
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`http://localhost:8080/api/class/get-all`);
                setClasses(result.data.classes);

            } catch (error) {
                message.error("Something Wrong!");
            }
        }
        getData()
    }, [])


    const editHandler = (id) => {
        router.push(`/school/class/${id}`)
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

    const column = [
        {
            dataField: 'name', headerName: 'Group', formatter: (name, data) => (
                <p>{name}</p>
            )
        },
        {
            dataField: 'createdAt', headerName: 'Created', formatter: (createdAt, data) => 
                (<p>{new Date(createdAt).toLocaleDateString()}</p>)
            
        },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div>
                    <button onClick={()=>editHandler(_id)} className='editBtn mr-2 tracking-wide'>Edit</button>
                    <button onClick={() => deleteHandler(_id)} className='deleteBtn ml-2 tracking-wide'>Delete</button>
                </div>
            )
        },
    ]


    if (classes.length < 1) {
        return (
            <AdminLayout>
                <div className='text-center mt-20'>
                    <Spin tip="Loading..." size="large">
                    </Spin>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Class List</h1>
            <Table data={classes} columns={column} />
        </AdminLayout>
    );
};

export default ViewClasses;