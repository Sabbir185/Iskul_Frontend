import React from 'react';

const NumberOfInstance = ({school, total}) => {
    return (
        <div className='h-16 rounded-xl text-center font-bold pt-1 text-lg -space-y-3 bg-gray-600 shadow-xl'>
            <h1 className='text-cyan-500'>{school}</h1>
            <h1 className='text-cyan-400'>{total}</h1>
        </div>
    );
};

export default NumberOfInstance;