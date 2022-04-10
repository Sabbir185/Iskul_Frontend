import React from 'react';
import { useUser } from '../../../contexts/userContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CloudDownloadOutlined, DeleteOutlined } from '@ant-design/icons'

const Notice = () => {
    const { user } = useUser();
    const router = useRouter()
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        if (!!user) {
            async function getData() {
                const id = user?.schoolId?._id;
                if (!!id) {
                    try {
                        const result = await axios.get(`http://localhost:8080/api/notice/filtered-subject/${id}`);
                        console.log('notice=',result.data.notices)
                        setNotices(result.data.notices);

                    } catch (error) {
                        if (error.response.data.message) {
                            message.error(error.response.data.message);

                        } else {
                            message.warning("Failed, maybe you're not authorized!");
                        }
                    }
                }
            }
            getData()
        }
    }, [user])


    const downloadHandler = (link) => {
        router.push(`http://localhost:8080/${link}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteNotice(id)
        if (res.status) {
            message.success(res.message);
            setTimeout(() => {
                router.push('/school')
            }, 3000);
        }
    }

    const column = [
        {
            dataField: 'title', headerName: 'Title', formatter: (name, data) => (
                <p>{name}</p>
            )
        },
        {
            dataField: 'createdAt', headerName: 'Published', formatter: (createdAt, data) => (
                <p>{new Date(createdAt).toLocaleDateString()}</p>
            )
        },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div className={user?.role === 'student' ? 'grid grid-cols-1 place-content-center' : 'grid grid-cols-2 place-content-center'}>
                    <p className='block text-sm text-green-500 cursor-pointer font-bold' title='download'> <a href={`http://localhost:8080/${data.file}`} target='_blank' rel="noreferrer"><CloudDownloadOutlined /></a> </p>
                    <p onClick={() => deleteHandler(_id)} className={user?.role === 'student' ? 'hidden' : 'block font-bold text-sm text-red-500 cursor-pointer'} title="delete"><DeleteOutlined /></p>
                </div>
            )
        },
    ]
    const fixedNotice = notices.slice(0, 5);
    //console.log('slice=', fixedNotice)

    return (
        <div>
            <table className='table border-collapse border border-slate-500 h-12 w-full test-center'>
                <thead>
                    <tr className='text-sm'>
                        <th className="border border-slate-300">SN</th>
                        {
                            column?.map((column, index) => (
                                <th key={index} className="border border-slate-300 p-2">
                                    {column.headerName}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className='text-center text-gray-600'>
                    {

                        fixedNotice?.map((d, index) => (
                            <tr key={index} className='text-sm'>
                                <td className='border'>{index + 1}</td>
                                {
                                    column?.map((col, ind) => (
                                        <td key={ind} className='border'>
                                            {
                                                typeof col?.formatter === 'function' ?
                                                    col?.formatter(d[col.dataField], d)
                                                    :
                                                    d[col.dataField]
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Notice;