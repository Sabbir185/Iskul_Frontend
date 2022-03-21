import React from 'react';

const NumberOfInstance = ({school, total}) => {
    return (
        <div className='h-16 rounded-xl text-center pt-1 -space-y-3 bg-gray-50 shadow-xl'>
            <h1 className='text-cyan-500 text-xl font-bold'>{total}</h1>
            <h1 className='text-cyan-500'>{school}</h1>
        </div>
    );
};

export default NumberOfInstance;