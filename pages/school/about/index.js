import React from 'react';
import { useUser } from '../../../contexts/userContext';
import AdminLayout from '../../../layout/adminLayout';

const AboutSchool = () => {
    const { user } = useUser()

    return (
        <AdminLayout>
            <div className='bg-slate-100 h-screen rounded-md pt-3 m-0'>

                <div className='md:w-6/12 mx-auto mt-10 pt-10 text-center bg-emerald-100 rounded-lg h-44'>
                    <h1 className='font-bold text-lg text-gray-700'>School Name: {user?.schoolId?.schoolName}</h1>
                    <h1 className='font-bold text-lg text-gray-600'>School Email: {user?.schoolId?.schoolEmail}</h1>
                    <h1 className='font-bold text-lg text-gray-600'>Established: {user?.schoolId?.established}</h1>
                </div>
                
            </div>
        </AdminLayout>
    );
};

export default AboutSchool;