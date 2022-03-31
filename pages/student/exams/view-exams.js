import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/table';
import StudentLayout from '../../../layout/studentLayout';

const ViewExams = () => {
    const [exams, setExams] = useState([]);
    const token = Cookies.get('token');

    const examAll = [
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "courseName":"Object Oriented Programming I",
            "courseCode": "CSE 1201",
            "ctDate":"2022-03-19",
            "examDate":"2022-03-29",
            "__v":0
        }
    ]

    useEffect(() => {
        async function getData() {
            try {
                setExams(examAll);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])

    const column = [
        {
            dataField: 'courseName', headerName: 'Course', formatter: (_, exams) => (
                <p>{exams.courseName}</p>
            )
        },
        {
            dataField: 'courseCode', headerName: 'Course Code', formatter: (_, exams) => (
                <p>{exams.courseCode}</p>
            )
        },
        { dataField: 'cTDate', headerName: 'CT Date', formatter: (_, exams) => (
                <p>{exams.ctDate}</p>
            ) },
        { dataField: 'examDate', headerName: 'Exam Date' , formatter: (_, exams) => (
                <p>{exams.examDate}</p>
            )}
    ]

    return (
        <StudentLayout>
            <h1 className='text-center font-semibold text-lg mt-4'>Exam Information</h1>
            <Table data={exams} columns={column} />
        </StudentLayout>
    );
};

export default ViewExams;