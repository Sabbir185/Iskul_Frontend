import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Table from '../../../components/table/table';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteClassAttendance } from '../../../components/helper/delete';


// child component of view-records
const ViewAttendance = ({ date, class_name, subject, school, teacher }) => {
  const [attendanceData, setAttendanceData] = useState({});
  // const [deleteRecord, setDeleteRecord] = useState(false)

  // fetching data
  useEffect(() => {
    async function getData() {
      const data = {
        date, class_name, subject, school, teacher
      }
      try {
        const token = await Cookies.get('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        const res = await axios.post('http://localhost:8080/api/attendance/getAttendance', data, config);

        if (res?.data?.status === true) {
          setAttendanceData(res.data.attendance)
        }

      } catch (error) {
        if (error?.response?.data?.message) {
          setAttendanceData({})
          message.success(error.response.data.message)

        } else {
          setAttendanceData({})
          message.success(error.message)
        }
      }
    }
    getData()

  }, [date, class_name, subject, school, teacher])



  const column = [
    {
      dataField: 'name', headerName: 'Name',
    },
    { dataField: 'email', headerName: 'Email' },
    {
      dataField: 'status', headerName: 'Status', formatter: (_, data) => (
        <span>{data?.status === 'present' ? <span className='text-green-600'>Present</span> : <span className='text-red-500'>Absent</span>}</span>
      )
    },
  ];


  const deleteHandler = async (id) => {
    const res = await deleteClassAttendance(id)
    if (res?.status === true) {
      message.success(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 2500);

    } else {
      message.error(res.message);
    }
  }
  

  return (
    <div>
      {
        !!attendanceData?.students?.length > 0 &&
        <div>
          <div className='flex items-center gap-3 ml-5'>
            <p>Delete this record : </p>
            <p onClick={() => deleteHandler(attendanceData?._id)} className='text-red-600 cursor-pointer' title="Delete"><FaTrashAlt /></p>
          </div>

          <Table columns={column} data={attendanceData.students} />
        </div>
      }
    </div>
  );
};

export default ViewAttendance;