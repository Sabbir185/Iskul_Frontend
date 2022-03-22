import React from 'react';
import { Form, Input, Button, Upload, } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useUser } from '../../contexts/userContext';


const InfoUpdateForm = ({ }) => {
    const { user } = useUser()
    const { firstName, lastName, email } = user;

    const onFinish = async (values) => {
        console.log(values)
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };


    return (
        <div className='m-auto bg-gray-50 rounded-lg p-10 shadow-md font-semibold w-11/12'>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                {/* <Form.Item
                    name="upload"
                    label="Update Profile Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="image size must less than 200 KB"
                >
                    <Upload name="image" listType="pictures">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item> */}

                <Form.Item
                    label="First Name"
                    name="firstName"
                >
                    <Input placeholder={firstName} />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                >
                    <Input placeholder={lastName} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input placeholder={email} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default InfoUpdateForm;