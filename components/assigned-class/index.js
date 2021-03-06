import React from 'react';
import { useUser } from '../../contexts/userContext';


const AssignedClassView = ({ data }) => {
    const { user } = useUser();

    return (
        <div className='md:grid md:grid-cols-3 gap-2 text-center mt-5 bg-slate-200 rounded-lg py-5 px-3'>
            <div className='border-2 pt-3 bg-gray-50 rounded-md'>
                <h1>Class Name</h1>
                <hr />

                <h1 className='font-mono mt-2'>{data.name}</h1>
            </div>

            <div className='border-2 pt-3 bg-gray-50 rounded-md'>
                <h1>Subjects Name</h1>
                <hr />

                {
                    data?.class_info?.map((info, i) => <ul key={i+1} className='font-mono mt-2'>
                        <li>{info.subjects.name}</li>
                        <hr />
                    </ul>)
                }
            </div>

            <div className='border-2 pt-3 bg-gray-50 rounded-md'>
                <h1>Teachers Name</h1>
                <hr />

                {
                    data?.class_info?.map((info, i) => <ul key={i+2} className='font-mono mt-2'>
                        <li className={info?.teachers?.firstName===user.firstName? 'text-green-500':''}>{info?.teachers?.firstName + " " + info?.teachers?.lastName}</li>
                        <hr />
                    </ul>)
                }
            </div>
        </div>
    );
};

export default AssignedClassView;