import React from 'react';
import { useRouter } from 'next/router'
import AdminLayout from '../../../layout/adminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUser } from '../../../contexts/userContext'
import UserProfileDetails from '../../../components/userProfileDetails';


const ProfileDetails = () => {
    const { user } = useUser();
    const router = useRouter();
    const userId = router.query.id;

    useEffect(() => {

    }, [])

    
    return (
        <AdminLayout >
            <UserProfileDetails userData={user}/>
        </AdminLayout>
    );
};

export default ProfileDetails;