import React from 'react';
import Table from '../../../components/table/table';
import { useSearchResult } from '../../../contexts/searchInputContext';
import AdminLayout from '../../../layout/adminLayout';
import { useRouter } from 'next/router';
import { deleteSchool } from '../../../components/helper/delete';


const UpdateSchoolInfo = () => {
    const router = useRouter()
    const { searchResult } = useSearchResult()

    const editHandler = (id) => {
        router.push(`/admin/school/edit/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteSchool(id)
        if (res.status) {
            alert(res.message)
            router.push('/admin')
        }
    }

    const column = [
        { dataField: 'schoolName', headerName: 'Name' },
        { dataField: 'schoolEmail', headerName: 'Email' },
        { dataField: 'established', headerName: 'Established' },
        {
            dataField: '_id', headerName: 'Action', formatter: _id => (
                <div>
                    <button onClick={()=> editHandler(_id)} className='editBtn mr-2 tracking-wide'>Edit</button>
                    <button onClick={() => deleteHandler(_id)} className='deleteBtn ml-2 tracking-wide'>Delete</button>
                </div>
            )
        },
    ];


    return (
        <AdminLayout>
            {
                (searchResult?.length > 0) ?
                    <h1 className='text-center font-semibold text-lg mt-4 text-green-700 bg-gray-300 p-1 rounded-lg '>School has found!</h1>
                    :
                    <h1 className='text-center font-semibold text-lg mt-4 text-green-700 bg-gray-300 p-1 rounded-lg'>to update school information, you have to search school by school&apos;s email address</h1>
            }
            {
                searchResult?.length ? <Table data={searchResult} columns={column} /> :
                    <Table data={searchResult = []} columns={column} />
            }
        </AdminLayout>
    );
};

export default UpdateSchoolInfo;
// talsher@gmail.com