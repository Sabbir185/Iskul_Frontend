import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FaTelegramPlane, FaCheck, FaTimes } from "react-icons/fa";
import Table from '../../../components/table/table';
import Cookies from 'js-cookie'


const AttendanceCount = ({ classDate, classID, user, subjectId }) => {
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


  const [togglePresent, setToggleArray] = useState([])
  const [toggleAbsent, setToggleAbsent] = useState([])

  const [stdData, setStdData] = useState({})
  const [stdStatus, setStdStatus] = useState(null)

  const [students, setStudents] = useState([])


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
        setStudents([...students])
        break;
      }
    }

    if (index === null) {
      setStudents([...students, info])
    }

    setStdData(info)
    setStdStatus(status)
  }

  /*
     toggling, 
     if click on present button, togglePresent[user_email] and toggleAbsent[]
     if click on absent button, togglePresent[] and toggleAbsent[user_email]
     je status a click korbe; se array te email store hobe 
     ebong sathe sathe onno array theke email delete hoye jabe
  */
  const toggleFunction = (data, status) => {
    // toggle Present section
    for (let i = 0; i < students?.length; i++) {
      if (students[i].email === data.email) {
        if (students[i].status === 'present') {
          setToggleArray([...togglePresent, data.email])

        } else {
          for (let j = 0; j < togglePresent?.length; j++) {
            if (togglePresent[j] == data.email) {
              togglePresent.splice(j, 1);
              j--;
            }
          }
          setToggleArray([...togglePresent])
        }
      }
    }

    // toggle Absent section
    for (let i = 0; i < students?.length; i++) {
      if (students[i].email === data.email) {
        if (students[i].status === 'absent') {
          setToggleAbsent([...toggleAbsent, data.email])

        } else {
          for (let j = 0; j < toggleAbsent?.length; j++) {
            if (toggleAbsent[j] == data.email) {
              toggleAbsent.splice(j, 1);
              j--;
            }
          }
          setToggleAbsent([...toggleAbsent])
        }
      }
    }
  }

  useEffect(() => {
    toggleFunction(stdData, stdStatus);
  }, [stdData, stdStatus])


  // for new class, need to array empty
  useEffect(() => { setStudents([]), setToggleArray([]), setToggleAbsent([]) }, [classID])


  // submit attendance data
  const handleSubmitAttendance = async () => {

    if (studentData?.students?.length !== students?.length || students.length === 0) {
      message.warning('Please roll call all student')

    } else {
      const data = {
        date: classDate,
        class_name: classID,
        subject: subjectId,
        teacher: user?._id,
        students,
        school: user?.schoolId?._id
      }

      try {
        const token = await Cookies.get('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        const res = await axios.post('http://localhost:8080/api/attendance/create', data, config);

        if (res?.data?.status === true) {
          message.success(res.data.message)
        }

      } catch (error) {
        if (error?.response?.data?.message) {
          message.success(error.response.data.message)
        } else {
          message.success(error.message)
        }
      }
    }

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
              togglePresent?.includes(data.email) ? <span className='text-xl text-green-500'><FaCheck /></span> : 'Present'
            }
          </button>

          <button onClick={() => handleStatus(data, 'absent')} className="block outline outline-slate-300 rounded-lg px-2 cursor-pointer outline-2 hover:scale-105 focus:outline focus:outline-2 focus:outline-red-200 transition focus:shadow-md focus:shadow-red-300 font-mono font-semibold text-red-600">
            {
              toggleAbsent?.includes(data.email) ? <span className='text-xl text-red-500'><FaTimes /></span> : 'Absent'

            }
          </button>

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