import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Spin } from 'antd';
import { deleteSchool } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';


const SchoolViewAll = () => {
    const router = useRouter()
    const [school, setSchool] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`http://localhost:8080/api/school/get-all`);
                setSchool(result.data.schools);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])


    const editHandler = (id) => {
        router.push(`/admin/school/edit/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteSchool(id)
        if (res.status) {
            toast.success(res.message);
            setTimeout(() => {
                router.push('/admin')
            }, 2700);
        }
    }

    const column = [
        {
            dataField: 'schoolName', headerName: 'School Name', formatter: (name, data) => (
                <p>{name}</p>
            )
        },
        { dataField: 'schoolEmail', headerName: 'Email Address' },
        {
            dataField: 'established', headerName: 'Established'
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


    if (school.length < 1) {
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
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>School List</h1>
            <Table data={school} columns={column} />

            <ToastContainer
                position="top-center"
                autoClose={2600}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AdminLayout>
    );
};

export default SchoolViewAll;