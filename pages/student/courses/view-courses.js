import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/table';
import StudentLayout from '../../../layout/studentLayout';

const ViewCourses = () => {
    const [coursesAll, setCoursesAll] = useState([]);
    const token = Cookies.get('token');

    const courses = [
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "courseName":"Object Oriented Programming I",
            "courseCode": "CSE 1201",
            "credit":"03",
            "courseTeacher":"Joydib Mohajon",
            "books":"Object Oriented Programming",
            "__v":0
        }
    ]

    useEffect(() => {
        async function getData() {
            try {
                setCoursesAll(courses);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])

    const column = [
        {
            dataField: 'courseName', headerName: 'Course Name', formatter: (_, data) => (
                <p>{data.courseName}</p>
            )
        },
        { dataField: 'courseCode', headerName: 'Course Code' },
        { dataField: 'credit', headerName: 'Credit' },
        { dataField: 'courseTeacher', headerName: 'Teacher' },
        { dataField: 'books', headerName: 'Books' }
    ]

    return (
        <StudentLayout>
            <h1 className='text-center font-semibold text-lg mt-4'>Course List</h1>
            <Table data={courses} columns={column} />
        </StudentLayout>
    );
};

export default ViewCourses;