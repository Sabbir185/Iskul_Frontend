import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/table';
import StudentLayout from '../../../layout/studentLayout';

const ViewNotice = () => {
    const [notice, setNotice] = useState([]);
    const token = Cookies.get('token');

    const noticeAll = [
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "courseName":"Object Oriented Programming I",
            "notice": "Class time will be started from 22th july on class time",
            "time":"2022-03-19",
            "__v":0
        }
    ]

    useEffect(() => {
        async function getData() {
            try {
                setNotice(noticeAll);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])

    const column = [
        {
            dataField: 'courseName', headerName: 'Course', formatter: (_, data) => (
                <p>{data.courseName}</p>
            )
        },
        { dataField: 'notice', headerName: 'Notice', formatter: (_, data) => (
                <p>{data.notice}</p>
            ) },
        { dataField: 'publishTime', headerName: 'Time', formatter: (_, data) => (
                <p>{data.time}</p>
            ) }
    ]

    return (
        <StudentLayout>
            <h1 className='text-center font-semibold text-lg mt-4'>Notices</h1>
            <Table data={notice} columns={column} />
        </StudentLayout>
    );
};

export default ViewNotice;