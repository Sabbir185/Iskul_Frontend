import { message } from 'antd';
import React, { useState, useRef } from 'react';
import { useUser } from '../../../contexts/userContext';
import AdminLayout from '../../../layout/adminLayout';
import Cookies from 'js-cookie';
import axios from 'axios'
import { useRouter } from 'next/router'


const CreateNotice = () => {
    const router = useRouter();
    const { user } = useUser();
    const [fileData, setFileData] = useState(null)
    const titleRef = useRef()
    const desRef = useRef()

    const handleFile = (e) => {
        setFileData(e.target.files[0])
    }

    const handleForm = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = titleRef.current.value;
        const file = fileData;

        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)
        formData.append('school', user.schoolId._id)

        if(!!user) {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: {
                        'content-type': 'multipart/from-data',
                        Authorization: `Bearer ${token}`
                    }
                }

                const res = await axios.post(`http://localhost:8080/api/notice/create`, formData, config)

                if(res.data.status === true) {
                    message.success(res.data.message);
                    setTimeout(() => {
                        router.push('/school/notice/view-all')
                    }, 2500);
                }
                
            } catch (error) {
                message.error(error.response.data.message)
            }
        }
        
    }


    return (
        <AdminLayout>
            <div className='bg-slate-300 w-full h-screen pt-10'>
                <div className='bg-slate-200 w-11/12 md:w-2/3 p-10 rounded-md mx-auto shadow-lg'>
                    <form onSubmit={handleForm}>

                        <label htmlFor="title" className='required-marker'>Title</label>
                        <input type="text" name='title' ref={titleRef} placeholder="Title" required className='block w-full rounded-md outline-1 outline-emerald-500 focus:outline-cyan-400 px-4 py-1 font-semibold mb-5 border-green-500 border' />

                        <label htmlFor="description">Description</label>
                        <textarea cols={10} rows={5} type="text" name='description' ref={desRef} placeholder="Description" className='block w-full rounded-md outline-1 outline-emerald-500 focus:outline-cyan-400 px-4 py-1 font-semibold mb-5 border-green-500 border' />

                        <label htmlFor="notice" className='required-marker'>PDF File Upload</label>
                        <input type="file" onChange={handleFile} placeholder="file" className="block w-full" required />
                        <small><em>Only pdf and image file, upto 5 MB</em></small>

                        <button type="submit" className='block mt-7 bg-teal-500 px-4 py-1 rounded-md cursor-pointer shadow-lg font-semibold focus:translate-y-1 transition'>POST</button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateNotice;