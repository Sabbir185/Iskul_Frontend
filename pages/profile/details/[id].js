import React from 'react';
import { useRouter } from 'next/router'
import AdminLayout from '../../../layout/adminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const ProfileDetails = () => {
    const router = useRouter();
    const userId = router.query.id;
    const [user, SetUser] = useState({});
    console.log(userId)

    useEffect(()=>{

    },[])

    return (
        <AdminLayout >
            <h1>User Profile Page</h1>
        </AdminLayout>
    );
};

export default ProfileDetails;