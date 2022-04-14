import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FaTelegramPlane } from "react-icons/fa";
import Table from '../../../components/table/table';


const AttendanceCount = ({ classDate, classID }) => {
  const [studentData, setStudentData] = useState({});


  // fetching class 
  useEffect(() => {
    if (!!classID) {
      const handleChange = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/api/class/${classID}`)
          if (res.data.status === true) {
            setStudentData(res.data.classInfo)
          }

        } catch (error) {
          if (error?.response?.data?.message) {
            message.error(error.response.data.message)
          } else {
            message.error(error.message)
          }
        }
      }
      handleChange()
    }
  }, [classID])


  let students = [];
  let toggle = [];
  // handle status and student data
  const handleStatus = (data, status) => {
    const name = data.firstName + " " + data.lastName;
    const email = data.email;
    const info = { name, email, status };

    let index = null;
    // replace or update user info
    for (let i = 0; i < students?.length; i++) {
      if (students[i].email === info.email) {
        index = i;
        students[i] = info;
        break;
      }
    }

    if (index === null) {
      students.push(info);
    }

    // toggle section
    for (let i = 0; i < students?.length; i++) {
      if (students[i].email === data.email) {
        if (students[i].status === 'present') {
          toggle.push(data.email)

        } else {
          for (let j = 0; j < toggle?.length; j++) {
            if (toggle[j] == data.email) {
              toggle.splice(j, 1);
              // break;
            }
          }
        }
      }
    }
    console.log(toggle)
  }

  console.log(toggle)

  // for new class, need to array empty
  useEffect(() => { students = [], toggle = [] }, [classID])


  // submit attendance data
  const handleSubmitAttendance = () => {
    if (studentData?.students?.length !== students?.length) {
      message.warning('Please roll call all student')
    }

    console.log(students)
    console.log(toggle)
  }


  const column = [
    {
      dataField: 'firstName', headerName: 'Name', formatter: (_, data) => (
        <p>{data.firstName + " " + data.lastName}</p>
      )
    },
    { dataField: 'email', headerName: 'Email' },
    {
      dataField: '_id', headerName: 'Status', formatter: (_, data) => (
        <div className='flex items-center justify-center gap-5'>
          <button onClick={() => handleStatus(data, 'present')} className="block outline outline-slate-300 rounded-lg px-2 cursor-pointer outline-2 hover:scale-105 focus:outline focus:outline-2 focus:outline-cyan-200 transition focus:shadow-md focus:shadow-green-300 font-mono font-semibold " >
            {
              toggle?.includes(data.email) ? 'Loading' : 'Present'
            }
          </button>

          <button onClick={() => handleStatus(data, 'absent')} className="block outline outline-slate-300 rounded-lg px-2 cursor-pointer outline-2 hover:scale-105 focus:outline focus:outline-2 focus:outline-red-200 transition focus:shadow-md focus:shadow-red-300 font-mono font-semibold text-red-600">Absent</button>

        </div>
      )
    },
  ]



  return (
    <div>
      <Table columns={column} data={studentData.students} />

      <button className='flex items-center mx-auto gap-2 mt-7 border-2 py-1 px-2 bg-green-300 rounded-lg shadow-md outline outline-slate-200 focus:translate-y-1 focus:shadow-xl focus:outline focus:outline-cyan-200 transition' onClick={handleSubmitAttendance}>
        <span className='text-slate-700 font-semibold block'>Submit</span>
        <span className='text-cyan-600 block'><FaTelegramPlane /></span>
      </button>

    </div>
  );
};

export default AttendanceCount;