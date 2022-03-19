import React from 'react';
import classes from './table.module.css'

const TableInfo = ({tableData, serial, tableHeader}) => {
    const {firstName, lastName, email, currentClass, role} = tableData;

    let roleType;
    if(tableHeader.includes('Role')){
        roleType = role;
    }else {
        roleType = currentClass? currentClass : '';
    }

    return (
        <tr className=''>
            <td className='border p-2'>{serial+1}</td>
            <td className='border p-2'>{firstName +' '+lastName}</td>
            <td className='border p-2'>{email}</td>
            <td className='border p-2'>{roleType}</td>
            <td className='border p-2'>
                <button className='editBtn mr-2 tracking-wide'>Edit</button>
                <button className='deleteBtn ml-2 tracking-wide'>Delete</button>
            </td>
        </tr>
    );
};

export default TableInfo;