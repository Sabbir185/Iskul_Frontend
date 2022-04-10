import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import AdminLayout from '../../../layout/adminLayout';
import Table from '../../../components/table/table';
import { Modal, Spin } from 'antd';
import { deleteUser } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useUser } from '../../../contexts/userContext';
import UserDetails from '../../../components/modal/userDetails';
import { useSearchResult } from '../../../contexts/searchInputContext';
import UserSearch from '../../../components/helper/user-search';
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const ViewAllStudent = () => {
    const { user } = useUser();
    const router = useRouter()
    const [usersData, setUsersData] = useState([]);
    const { searchResult, setSearchResult } = useSearchResult()

    useEffect(() => {
        if (!!user) {
            async function getData() {
                const id = user?.schoolId?._id;
                if (!!id) {
                    try {
                        const token = await Cookies.get('token');
                        const config = {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                        const result = await axios.get(`http://localhost:8080/api/user/get-data-schoolId-role/${id}/student`, config);
                        setUsersData(result.data.users);

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


    const editHandler = (firstName, lastName, email, id) => {
        router.push(`/school/student/${firstName}/${lastName}/${email}/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteUser(id)
        if (res.status) {
            message.success(res.message);
            setTimeout(() => {
                router.push('/school')
            }, 2500);
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
            dataField: 'firstName', headerName: 'Name', formatter: (name, data) => (
                <p className='text-cyan-500 cursor-pointer' onClick={() => showModal(data._id)}>{data.firstName + " " + data.lastName}</p>
            )
        },
        {
            dataField: 'email', headerName: 'Email', formatter: (email, data) =>
                (<p>{email}</p>)

        },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div className='flex items-center justify-evenly'>
                    <p onClick={() => editHandler(data.firstName, data.lastName, data.email, _id)} className='text-cyan-600 cursor-pointer' title="Edit"><FaEdit /></p>
                    <p onClick={() => deleteHandler(_id)} className='text-red-600 cursor-pointer' title="Delete"><FaTrashAlt /></p>
                </div>
            )
        },
    ]


    return (
        <AdminLayout>
            <div className='bg-slate-200 h-screen rounded-md pt-3 m-0'>
                <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Quick Search</h1>

                <UserSearch />

                {/* table */}
                {
                    searchResult.length ?
                        <Table data={searchResult} columns={column} />
                        :
                        <Table data={usersData} columns={column} />
                }


                {/* modal */}
                {
                    !!usersData &&
                    <Modal title="User Information" visible={isModalVisible} onCancel={handleCancel} footer={null} >
                        {
                            !!searchResult.length &&
                            searchResult?.map(d => <UserDetails key={d._id} id={d._id} />)
                        }
                        {
                            searchResult.length === 0 &&
                            <UserDetails id={classId} />
                        }
                    </Modal>
                }
            </div>
        </AdminLayout>
    );
};

export default ViewAllStudent;