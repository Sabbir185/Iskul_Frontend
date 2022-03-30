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
import { useUser } from '../../../contexts/userContext'
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const ViewAllCourses = () => {
    const { user } = useUser();
    const router = useRouter()
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!!user) {
            async function getData() {
                const id = user?.schoolId?._id;
                if (!!id) {
                    try {
                        const result = await axios.get(`http://localhost:8080/api/subject/filtered-subject/${id}`);
                        setCourses(result.data.subjects);

                    } catch (error) {
                        message.error("Something Wrong!");
                    }
                }
            }
            getData()
        }
    }, [user])


    const editHandler = (subName, code, id) => {
        router.push(`/school/courses/${subName}/${code}/${id}`)
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
                <div className='flex items-center justify-evenly'>
                    <p onClick={() => editHandler(data.name, data.code, _id)} className='text-cyan-600 cursor-pointer' title="Edit"><FaEdit/></p>
                    <p onClick={() => deleteHandler(_id)} className='text-red-600 cursor-pointer' title="Delete"><FaTrashAlt/></p>
                </div>
            )
        },
    ]


    return (
        <AdminLayout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Course List</h1>
            <Table data={courses} columns={column} />
        </AdminLayout>
    );
};

export default ViewAllCourses;