import React, { useState, useEffect } from 'react';
import { DatePicker, Space, Form, Select, message } from 'antd';
const { Option } = Select
import AdminLayout from '../../../layout/adminLayout';
import { useUser } from '../../../contexts/userContext';
import axios from 'axios';
import AttendanceCount from './attendanceCount';


const Attendance = () => {
  const { user } = useUser()
  const [classData, setClassData] = useState(null);
  const [classDate, setClassDate] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [filteredSubject, setFilteredSubject] = useState([]);
  const [classID, setClassID] = useState(null);

  // data fetched by school and teacher id
  useEffect(() => {
    if (!!user) {
      const teacherId = user?._id
      const schoolId = user?.schoolId?._id
      if (!!teacherId && !!schoolId) {
        const getClassData = async () => {
          try {
            const res = await axios.get(`http://localhost:8080/api/class/get-assigned-class?teacherId=${teacherId}&schoolId=${schoolId}`);

            if (res?.data?.status === true) {
              setClassData(res.data.classes)
            }

          } catch (error) {
            message.error(error?.response?.data?.message)
          }
        }
        getClassData();
      }
    }
  }, [user])


  // class date
  function onChange(date, dateString) {
    setClassDate(dateString)
  }

  // current class id
  const handleClass = (classId) => {
    setClassID(classId)
    const targetClass = classData?.find(data => data._id === classId);
    const teacherClassInfo = targetClass?.class_info?.filter(info => info.teachers._id === user._id)

    // filter subject according to teacher which was set by headmaster/admin
    setFilteredSubject(teacherClassInfo)
  }

  const handleSubject = (id) => {
    setSubjectId(id);
  }



  return (
    <AdminLayout>
      <h1 className='text-lg text-center text-slate-700 border-b-2 mx-10 md:mx-32 border-green-300 pt-3 pb-1'>Please select today&apos;s date and class</h1>

      <div className='md:flex md:items-center md:justify-center md:gap-10 pt-3'>
        <div className='flex items-center gap-2'>
          <Form>
            <Form.Item name="date" label="Select Date" rules={[{ required: true, message: 'Please Select Date' }]} hasFeedback>
              <DatePicker onChange={onChange} format={'DD-MM-YYYY'} />
            </Form.Item>
          </Form>
        </div>

        <div>
          <Form>
            <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback className='w-60'>
              <Select placeholder="today's class" onChange={handleClass} >
                {
                  classData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </div>

        <div>
          <Form>
            <Form.Item name="subject" label="Select Subject" rules={[{ required: true, message: 'Please Select Subject' }]} hasFeedback>
              <Select style={{ width: '100%' }} placeholder='choose subject...' onChange={handleSubject}>
                {
                  filteredSubject?.map((data, i) => <Option key={i} value={data.subjects._id}>{data.subjects.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>


      {/* show all student */}
      {
        (!!classDate && !!classID && !!subjectId) &&
        <div>
          <AttendanceCount classDate={classDate} classID={classID} user={user} subjectId={subjectId}/>
        </div>
      }

    </AdminLayout>
  );
};

export default Attendance;