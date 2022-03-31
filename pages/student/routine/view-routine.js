import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/table';
import StudentLayout from '../../../layout/studentLayout';

const ViewRoutine = () => {
    const [routine, setRoutine] = useState([]);
    const token = Cookies.get('token');

    const routineCurrent = [
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "classNo":"class1",
            "classTime":"11AM - 12PM",
            "saturday": "C",
            "sunday": "Networking",
            "monday": "OOP-I",
            "tuesday": "Java",
            "wednesday": "Data Structure",
            "thursday": "Algorithm",
            "friday": "X",
            "__v":0
        },
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "classNo":"class2",
            "classTime":"12 - 1PM",
            "saturday": "Networking",
            "sunday": "Discrete Math",
            "monday": "Algorithm",
            "tuesday": "Data Structure",
            "wednesday": "JS",
            "thursday": "OOP-I",
            "friday": "X",
            "__v":0
        },
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "classNo":"class3",
            "classTime":"1 - 2PM",
            "saturday": "Break",
            "sunday": "Break",
            "monday": "Break",
            "tuesday": "Break",
            "wednesday": "Break ",
            "thursday": "Break ",
            "friday": "X",
            "__v":0
        },
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "classNo":"class4",
            "classTime":"2 - 3PM",
            "saturday": "OOP-I",
            "sunday": "OOP-I",
            "monday": "Data Structure",
            "tuesday": "Python",
            "wednesday": "Networking",
            "thursday": "Algorithm",
            "friday": "X",
            "__v":0
        },
        {
            "_id":{"$oid":"62359aa8a47d54131c7b76ba"},
            "classNo":"class5",
            "classTime":"3 - 4PM",
            "saturday": "Java",
            "sunday": "Networking",
            "monday": "C",
            "tuesday": "JS",
            "wednesday": "Algorithm",
            "thursday": "Networking",
            "friday": "X",
            "__v":0
        }
    ]

    useEffect(() => {
        async function getData() {
            try {
                setRoutine(routineCurrent);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])

    const column = [
        {dataField: 'classTime', headerName: 'Duration'},
        {dataField: 'saturday', headerName: 'Saturday'},
        {dataField: 'sunday', headerName: 'Sunday'},
        {dataField: 'monday', headerName: 'Monday'},
        {dataField: 'tuesday', headerName: 'Tuesday'},
        {dataField: 'wednesday', headerName: 'Wednesday'},
        {dataField: 'thursday', headerName: 'Thursday'},
        {dataField: 'friday', headerName: 'Friday'},
    ]

    return (
        <StudentLayout>
            <h1 className='text-center font-semibold text-lg mt-4'>Routine</h1>
            <Table data={routine} columns={column} />
        </StudentLayout>
    );
};

export default ViewRoutine;