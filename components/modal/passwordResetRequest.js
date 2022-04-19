import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';


const PasswordResetRequest = ({ setIsModalVisible, setToggleLogin }) => {

  const onFinish = (values) => {
    async function sendEmail() {
      try {
        const res = await axios.post('http://localhost:8080/api/user/send-password-reset-email', values);

        if (res?.data?.status === true) {
          message.success(res.data.message);
          setIsModalVisible(false);
          setToggleLogin(true)
        }

      } catch (error) {
        if (error?.response?.data?.message) {
          message.success(error.response.data.message)
        } else {
          message.success(error.message)
        }
      }
    }
    sendEmail()
  };


  return (
    <div>
      <Form
        name="email"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input valid email!',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <div className='text-center'>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PasswordResetRequest;