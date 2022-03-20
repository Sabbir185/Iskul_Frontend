import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Spin } from 'antd';


const AdminList = () => {
    const [admin, setAdmin] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=admin`, config);

                setAdmin(result.data.data);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])


    const editHandler = () => {

    }
    const deleteHandler = () => {

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
                    <button onClick={deleteHandler} className='deleteBtn ml-2 tracking-wide'>Delete</button>
                </div>
            )
        },
    ];


    if (admin.length < 1) {
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
            <h1 className='text-center font-semibold text-lg mt-4'>Headmaster List</h1>
            <Table data={admin} columns={column} />
        </AdminLayout>
    );
};

export default AdminList;