import React from 'react';


const AssignedClassView = ({ data }) => {


    return (
        <div className='md:grid md:grid-cols-3 gap-2 text-center mt-5 bg-slate-200 rounded-lg py-5 px-3'>
            <div className='border-2 pt-3 bg-gray-100 rounded-md'>
                <h1>Class Name</h1>
                <hr />

                <h1 className='font-mono mt-2'>{data.name}</h1>
            </div>

            <div className='border-2 pt-3 bg-gray-100 rounded-md'>
                <h1>Subjects Name</h1>
                <hr />

                {
                    data?.subjects?.map((subject, i) => <ul key={i} className='font-mono mt-2'>
                        <li>{subject.name}</li>
                    </ul>)
                }
            </div>

            <div className='border-2 pt-3 bg-gray-100 rounded-md'>
                <h1>Teachers Name</h1>
                <hr />

                {
                    data?.teachers?.map((teacher, i) => <ul key={i} className='font-mono mt-2'>
                        <li>{teacher.firstName + " " + teacher.lastName}</li>
                    </ul>)
                }
            </div>
        </div>
    );
};

export default AssignedClassView;