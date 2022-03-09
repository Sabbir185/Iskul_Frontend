import { Form, Input, Button, Checkbox } from "antd";
import Link from "next/link";

const Signup = () => {
	const onFinish = (values) => {
        console.log(values);
    };

	return (
	<div>
<div className="relative md:h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center bg-img">
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-4 py-6 px-10 bg-white rounded-xl z-10">
                    <div className="text-center">
                        <h2 className="mt-1 text-3xl font-bold text-gray-900">
                            Welcom Back!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">Please sign un to your account</p>
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-3">
                        <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"><h2>fb</h2></span><span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-300 hover:shadow-lg cursor-pointer transition ease-in duration-300"> <h2>tw</h2></span>
                        <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"><h2>in</h2></span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="text-gray-500 font-normal">OR</span>
                        <span className="h-px w-16 bg-gray-300"></span>
                    </div>
                    <Form
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
						>
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter First Name",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    First Name
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter Last Name",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    Last Name
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter Your Email",
                                },
                            ]}
							label={
                                <label className="theme-font-color">
                                    Email
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                            // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            label={
                                <label className="theme-font-color">
                                    Password
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please comfirm your Password!",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    Comfirm Password
                                </label>
                            }
                        >
<input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                        <p classNameName="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>Already have an account?</span>
                            <Link href="login" ><span className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"> Sign in</span></Link>
                        </p>
                    
                </div>
            </div>



	</div>
	);
};

export default Signup;
