import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Spin } from 'antd';
import { deleteUser } from '../../../components/helper/delete';
import { useRouter } from 'next/router'


const Teacher = () => {
    const router = useRouter()
    const [teacher, setTeacher] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=teacher&role=headmaster`, config);

                setTeacher(result.data.data);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])


    const editHandler = () => {

    }

    const deleteHandler = async (id) => {
        const res = await deleteUser(id)
        if (res.status) {
            alert(res.message)
            router.push('/admin')
        }
    }

    const column = [
        {
            dataField: 'firstName', headerName: 'Name', formatter: (_, data) => (
                <p>{data.firstName + " " + data.lastName}</p>
            )
        },
        { dataField: 'email', headerName: 'Email' },
        { dataField: 'role', headerName: 'Designation' },
        {
            dataField: '_id', headerName: 'Action', formatter: _id => (
                <div>
                    <button onClick={editHandler} className='editBtn mr-2 tracking-wide'>Edit</button>
                    <button onClick={() => deleteHandler(_id)} className='deleteBtn ml-2 tracking-wide'>Delete</button>
                </div>
            )
        },
    ]


    if(teacher.length<1) {
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
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Teacher List</h1>
            <Table data={teacher} columns={column} />
        </AdminLayout>
    );
};

export default Teacher;