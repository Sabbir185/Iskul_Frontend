import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/table';
import StudentLayout from '../../../layout/studentLayout';

const ViewTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const token = Cookies.get('token');

    const teachersAll = [
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "teacher":"Joydib Mohajon",
            "courses":"Object Oriented Programming I",
            "email": "joydib@gmail.com",
            "phoneNumber":"01847385728",
            "__v":0
        }
    ]

    useEffect(() => {
        async function getData() {
            try {
                setTeachers(teachersAll);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])

    const column = [
        {
            dataField: 'teacher', headerName: 'Teachers', formatter: (_, data) => (
                <p>{data.teacher }</p>
            )
        },
        { dataField: 'courses', headerName: 'Courses', formatter: (_, data) => (
                <p>{data.courses}</p>
            )
        },
        { dataField: 'email', headerName: 'Email' , formatter: (_, data) => (
                <p>{data.email }</p>
            )
        },
        { dataField: 'phoneNumber', headerName: 'Phone Number' , formatter: (_, data) => (
                <p>{data.phoneNumber }</p>
            )
        }
    ]

    return (
        <StudentLayout>
            <h1 className='text-center font-semibold text-lg mt-4'>Course Teachers</h1>
            <Table data={teachers} columns={column} />
        </StudentLayout>
    );
};

export default ViewTeachers;