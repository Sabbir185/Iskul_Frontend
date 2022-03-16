import React from 'react';
import { useContext } from 'react';
import UserContext from '../../contexts/userContext';
import AdminLayout from '../../layout/adminLayout';

const StudentList = () => {
    const [user, setUser] = useContext(UserContext)

    console.log('from std', user)

    return (
        <>
            <div className='text-center font-bold'>
                <p className='mt-10'>I am a student</p>
            </div>
        </>
    );
};

export default StudentList;