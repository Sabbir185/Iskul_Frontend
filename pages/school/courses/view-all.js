import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Spin } from 'antd';
import { deleteSubject } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import { message } from 'antd';


const ViewAllCourses = () => {
    const router = useRouter()
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`http://localhost:8080/api/subject/get-all`);
                setCourses(result.data.subjects);

            } catch (error) {
                message.error("Something Wrong!");
            }
        }
        getData()
    }, [])


    const editHandler = (id) => {
        router.push(`/school/courses/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteSubject(id)
        if (res.status) {
            message.success(res.message);
            setTimeout(() => {
                router.push('/school')
            }, 3000);
        }
    }

    const column = [
        {
            dataField: 'name', headerName: 'Subject Name', formatter: (name, data) => (
                <p>{name}</p>
            )
        },
        {
            dataField: 'code', headerName: 'Code'
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


    if (courses.length < 1) {
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
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Course List</h1>
            <Table data={courses} columns={column} />
        </AdminLayout>
    );
};

export default ViewAllCourses;