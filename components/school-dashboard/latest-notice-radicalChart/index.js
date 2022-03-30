import { CheckCircleOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/userContext';
import { useRouter } from 'next/router'
import Link from 'next/link'
import CarouselAuto from '../../helper/carousel-auto';


const NoticeRadicalChar = () => {
    const { user } = useUser();
    const router = useRouter()
    const [notices, setNotices] = useState();

    // students
    useEffect(() => {
        if (!!user) {
            const id = user?.schoolId?._id;
            async function getNotices() {
                if (!!id) {
                    try {
                        const res = await axios.get(`http://localhost:8080/api/notice//filtered-subject/${id}`);

                        if (res.data.status === true) {
                            setNotices(res.data.notices)
                        }

                    } catch (error) {
                        if (error.response.data.message) {
                            message.error(error.response.data.message)
                        } else {
                            message.error(error.message)
                        }
                    }
                }
            }
            getNotices()
        }
    }, [user])


    const noticeData = notices?.slice(0, 3)


    return (
        <section className='mt-5'>
            <div className='md:grid md:grid-cols-2 md:gap-5 bg-slate-100 p-5 rounded-lg'>
                {/* notices */}
                <div className='bg-slate-50 h-52 pt-4'>
                    <h1 className='ml-11 border-b-2 mr-5 pt-3'>Latest Notices</h1>
                    <div className='-space-y-6'>
                        {
                            noticeData?.map((notice, i) => <div key={i}>
                                <ul>
                                    <li className='flex items-center justify-between mx-10'>
                                        <p className='flex items-center gap-2 hover:bg-slate-200'><CheckCircleOutlined /> {notice.title}</p>
                                        <p className='text-green-500 cursor-pointer text-lg' title='download'>
                                            <a href={`http://localhost:8080/${notice.file}`} target='_blank' rel="noreferrer" ><CloudDownloadOutlined /></a>
                                        </p>
                                    </li>

                                </ul>
                            </div>)
                        }
                    </div>

                </div>
                <div className='bg-slate-50 h-52'>
                    <CarouselAuto />
                </div>
            </div>
        </section>
    );
};

export default NoticeRadicalChar;