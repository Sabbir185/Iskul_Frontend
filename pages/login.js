import { Form, Input, Button, Checkbox, Modal } from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from 'react'
import PasswordResetRequest from "../components/modal/passwordResetRequest";


const Login = () => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter()

    const onFinish = async (values) => {
        try {

            const res = await axios.post(
                "http://localhost:8080/api/user/login",
                values
            );

            if (res.data.token) {
                Cookies.set("token", res.data.token);
                router.replace("/");
            } else {
                router.push("/login");
            }

        } catch (error) {
            console.log(error);
        }
    };


    const handleResetPassword = () => {
        setToggleLogin(false)
        setIsModalVisible(true);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setToggleLogin(true)
    };


    return (
        <div>
            <div className={`relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center bg-img`}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className={toggleLogin === true ? `max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10` : 'hidden'}>
                    <div>
                        <div className="text-center">
                            <h2 className="mt-2 text-3xl font-bold text-gray-900">Welcom Back!</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Please sign in to your account
                            </p>
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-3">
                            <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
                                <h2>fb</h2>
                            </span>
                            <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-300 hover:shadow-lg cursor-pointer transition ease-in duration-300">
                                <h2>tw</h2>
                            </span>
                            <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300">
                                <h2>in</h2>
                            </span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 mt-2">
                            <span className="h-px w-16 bg-gray-300"></span>
                            <span className="text-gray-500 font-normal">OR</span>
                            <span className="h-px w-16 bg-gray-300"></span>
                        </div>
                    </div>
                    <div>
                        <Form
                            onFinish={onFinish}
                            initialValues={{
                                remember: true
                            }}
                            layout="vertical"
                        >
                            <Form.Item
                                name="email"
                                initialValue=""
                                rules={[{
                                    required: true,
                                    message: "Please input your Password!",
                                },
                                ]}
                                label={<label className="theme-font-color">Email</label>}
                            >
                                <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                initialValue=""
                                rules={[{
                                    required: true,
                                    message: "Please input your Password!",
                                },
                                ]}
                                label={<label className="theme-font-color">Password</label>}
                            >
                                <Input.Password className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Log in
                            </Button>
                        </Form>
                        <p>Forgot your password? <span onClick={handleResetPassword} className="underline cursor-pointer text-green-600">Click</span></p>
                    </div>
                </div>

                <Modal title="Request For Resetting Password" visible={isModalVisible} footer={null} onCancel={handleCancel} >
                    <PasswordResetRequest setIsModalVisible={setIsModalVisible} setToggleLogin={setToggleLogin}/>
                </Modal>
            </div>
        </div>
    );
};

export default Login;
