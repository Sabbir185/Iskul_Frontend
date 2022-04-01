import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import Cookies from 'js-cookie';
import AdminLayout from '../../../layout/adminLayout'
import classes from './classRoom.module.css'
import { useUser } from '../../../contexts/userContext';
import { useRouter } from 'next/router';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};


const CreateRoom = () => {
    const { user } = useUser();
    const router = useRouter();


    const onFinish = values => {
        console.log('Received values of form:', values.names);
        if (!!values.names) {
            const schoolID = user?.schoolId?._id;
            if (!!schoolID) {
                async function createClassRoom() {
                    try {
                        const token = await Cookies.get('token');
                        const config = {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                        const data = {
                            class_rooms: values.names,
                            school: schoolID
                        }

                        const response = await axios.post('http://localhost:8080/api/class-room/create',data, config);

                        if (response.data.status === true) {
                            message.success(response.data.message);
                            setTimeout(() => {
                                router.push('/school')
                            }, 3000);
                        }

                    } catch (error) {
                        if (error?.response?.data?.message) {
                            message.error(error.response.data.message);

                        } else {
                            message.error(error.message);
                        }
                    }
                }
                createClassRoom()
            }
        }
    };


    return (
        <AdminLayout >
            <h1 className='text-center pt-2 pb-5 font-semibold text-lg text-cyan-800'>Create class room, you can update or delete at any time!</h1>
            <div className=''>
                <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                    <Form.List
                        name="names"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject(new Error('Add At least 1 Class Room'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Class Room' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input class name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="class room name" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className={classes.dynamic_delete_button}
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item >
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                    // icon={<PlusOutlined />}
                                    >
                                        + Add Class Room
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <div className='flex justify-center' style={{ width: '60%' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>

            </div>

        </AdminLayout >
    );
};

export default CreateRoom;