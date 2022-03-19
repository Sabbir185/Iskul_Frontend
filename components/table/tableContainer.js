import React from 'react';
import TableInfo from './tableInfo';
import classes from './table.module.css'
import { Spin } from 'antd';

const TableContainer = ({ data, tableHeader }) => {
    console.log(data)

    return (
        <div className='mx-16 h-full overflow-auto'>
            <table className='table-auto border-collapse border border-slate-500 w-full test-center tableContainer mt-5'>
                <thead>
                    <tr className=''>
                        {
                            tableHeader?.map((h, i, a) => <th key={i} className="border border-slate-300 p-2">{h}</th>)
                        }
                    </tr>
                </thead>
                <tbody className='text-center text-gray-600'>
                    {
                        data.length ?
                            data?.map((info, i, a) => <TableInfo key={info._id} tableData={info} serial={i} tableHeader={tableHeader} />)
                            :
                            <div className='text-center border-0' style={{ marginTop: '10%' }}>
                                <Spin tip="Loading..." size="large">
                                </Spin>
                            </div>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TableContainer;