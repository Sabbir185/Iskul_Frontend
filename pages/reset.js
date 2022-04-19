import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';


const PasswordReset = ({ pathForPublic }) => {
  const router = useRouter()
  const token = pathForPublic[4];

  const onFinish = (values) => {
    const { password, confirmPassword } = values;

    if (!!token && !!password && !!confirmPassword) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      async function passwordReset() {
        try {
          const res = await axios.patch('http://localhost:8080/api/user/reset-password', values, config);


          if (res?.data?.status === true) {
            message.success(res.data.message);
            setTimeout(() => {
              router.push('/login')
            }, 2500);
          }

        } catch (error) {
          if (error?.response?.data?.error) {
            message.success(error.response.data.error.message)
          } else {
            message.success(error.message)
          }
        }
      }
      passwordReset()

    } else {
      message.warning('Invalid input!')
    }
  };


  return (
    <div className='bg-slate-700 h-screen w-full pt-20'>
      <div className='w-1/2 mx-auto bg-gray-200 p-10 shadow-lg'>
        <h1 className='pb-5'>Reset Your Password</h1>
        <Form
          onFinish={onFinish}
          layout='vertical'
        >

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className='text-center'>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};


export default PasswordReset;