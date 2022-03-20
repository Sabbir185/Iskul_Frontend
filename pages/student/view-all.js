import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layout/adminLayout';
import axios from 'axios'
import Cookies from 'js-cookie';
import TableContainer from '../../components/table/tableContainer';

const StudentViewAll = () => {
    const [adminInfo, setAdminInfo] = useState([]);
    const token = Cookies.get('token')

    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=student`, config);

                setAdminInfo(result.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])


    const tableHeader = ['SN', 'Full Name', 'Email', 'Class', 'Action']
    
    return (
        <AdminLayout>
            <h1 className='ml-16 font-semibold text-lg mt-4'>Student List</h1>
           <TableContainer  data={adminInfo} tableHeader={tableHeader}/>
        </AdminLayout>
    );
};

export default StudentViewAll;