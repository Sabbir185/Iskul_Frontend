import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Alert, Form, message, Select, Skeleton, Spin } from 'antd';
const { Option } = Select;
import Cookies from 'js-cookie';
import classes from './teacherDashboard.module.css'
import { useUser } from '../../contexts/userContext';



const TeacherRoutines = ({ setTeacherRoutines }) => {
  const { user } = useUser();
  const [routines, setRoutines] = useState([]);

  // get routines by teacher id
  useEffect(() => {
    if (!!user) {
      const teacherId = user?._id;
      const schoolId = user?.schoolId?._id;
      if (!!teacherId && !!schoolId) {
        async function findRoutines() {
          try {
            const data = {
              teacherId, schoolId
            }
            const res = await axios.post(`http://localhost:8080/api/routine/get-all-routine-for-teacher`, data);

            if (res?.data?.status === true) {
              setRoutines(res.data.routines)
              setTeacherRoutines(res.data.routines)
            }

          } catch (error) {
            if (error?.response?.data?.message)
              message.error(error.response.data.message)
            else
              message.error(error.message)
          }
        }
        findRoutines()
      }
    }
  }, [user])


  return (
    <section className='pt-5 h-auto'>

      {/* routine showing */}
      {
        routines.length === 0 ?
          <div className='my-5 text-center'>
            <Spin tip="Loading..." size="large">
            </Spin>
          </div>
          :
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>

            <table className='table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope="col" className="px-6 py-3">Class</th>
                  <th scope="col" className="px-6 py-3">Subject</th>
                  <th scope="col" className="px-6 py-3">Day</th>
                  <th scope="col" className="px-6 py-3">Time</th>
                  <th scope="col" className="px-6 py-3">Room</th>
                </tr>
              </thead>
              <tbody>
                {
                  routines?.map((routine, i) => <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">

                    <td className="px-6 py-4">{routine.class_name.name}</td>
                    <td className="px-6 py-4">{routine.subject.name} ({routine.subject.code})</td>

                    <td className="px-6 py-4">
                      {
                        routine?.schedules?.map((schedule, i) =>
                          <span key={i + 1} className='block'>{schedule.day}</span>)
                      }
                    </td>
                    <td className="px-6 py-4">
                      {
                        routine?.schedules?.map((schedule, i) =>
                          <span key={i + 2} className='block'>{schedule.class_time}</span>)
                      }
                    </td>
                    <td className="px-6 py-4">
                      {
                        routine?.schedules?.map((schedule, i) =>
                          <span key={i + 3} className='block'>{schedule.class_room}</span>)
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

export default TeacherRoutines;