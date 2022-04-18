import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Alert, Form, message, Select, Skeleton, Spin } from 'antd';
const { Option } = Select;
import Cookies from 'js-cookie';
import classes from './studentDashborad.module.css'
import { useUser } from '../../contexts/userContext';



const TodayRoutine = () => {
  const { user } = useUser();
  const [classData, setClassData] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [classID, setClassID] = useState(null);


  // get class id by user id
  useEffect(() => {
    if (!!user) {
      const id = user?._id;
      if (!!id) {
        async function findClassId() {
          const token = await Cookies.get('token');
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          }
          try {
            const res = await axios.get(`http://localhost:8080/api/class/find-classes-by-studentId/${id}`, config);

            setClassData(res.data.studentClass)

          } catch (error) {

          }
        }
        findClassId()
      }
    }
  }, [user])


  // get routine  by class_name, day, school
  useEffect(() => {
    if (!!classData.length > 0) {
      const data = {
        class_name: classID === null ? classData[0]?._id : classID,
        school: user?.schoolId?._id,
        day: moment().format('dddd'),
      }
      async function routineData() {
        try {
          const res = await axios.post('http://localhost:8080/api/routine/filtered-routine-by-day', data);

          if (res?.data?.status === true) {
            setRoutines(res.data.routines)
          }
        } catch (error) {
          if (error?.response?.data?.message) {
            message.error(error.response.data.message)
          } else {
            message.error(error.message)
          }
        }
      }
      routineData();
    }
  }, [user, classData, classID])


  // get routine by class id
  const handleChange = (value) => {
    setClassID(value)
  }


  return (
    <section className='pt-5 h-auto'>
      {/* class input */}
      <div className={classes.select_class__option}>
        <Form>
          <Form.Item name="class_name" label="Select Class" rules={[{ required: true, message: 'Please Select Class' }]} hasFeedback>
            <Select placeholder='Class Options' onChange={handleChange}>
              {
                classData?.map((cls, i) => <Option key={i} value={cls._id}>{cls.name}</Option>)
              }
            </Select>
          </Form.Item>
        </Form>
      </div>


      {/* routine showing */}
      {
        routines.length == 0 ?
          <div className='my-5 text-center'>
            <Spin tip="Loading..." size="large">
            </Spin>
          </div>
          :
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>

            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope="col" className="px-6 py-3">Subject</th>
                  <th scope="col" className="px-6 py-3">Teacher</th>
                  <th scope="col" className="px-6 py-3">Class Time</th>
                  <th scope="col" className="px-6 py-3">Class Room</th>
                </tr>
              </thead>
              <tbody>
                {
                  routines?.map((routine, i) => <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">

                    <td className="px-6 py-4">{routine.subject.name} ({routine.subject.code})</td>
                    <td className="px-6 py-4">{routine.teacher.firstName + " " + routine.teacher.lastName}</td>

                    <td className="px-6 py-4">
                      {
                        routine?.schedules?.map((schedule, i) =>
                          <span key={i + 1}>{schedule.day === moment().format('dddd') && schedule.class_time}</span>)
                      }
                    </td>
                    <td className="px-6 py-4">
                      {
                        routine?.schedules?.map((schedule, i) =>
                          <span key={i + 2}>{schedule.day === moment().format('dddd') && schedule.class_room}</span>)
                      }
                    </td>

                  </tr>)
                }
              </tbody>
            </table>

          </div>
      }

    </section>
  );
};

export default TodayRoutine;