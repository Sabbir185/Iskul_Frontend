import { Form, Input, Button, Checkbox } from "antd";

const App = () => {
	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<div>
			<div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center bg-img">
				<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
				<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-bold text-gray-900">
							Welcom Back!
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							Please sign in to your account
						</p>
					</div>
					<div className="flex flex-row justify-center items-center space-x-3">
						<span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
							<h2>fb</h2>
						</span>
						<span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-300 hover:shadow-lg cursor-pointer transition ease-in duration-300">
							{" "}
							<h2>tw</h2>
						</span>
						<span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300">
							<h2>in</h2>
						</span>
					</div>
					<div className="flex items-center justify-center space-x-2">
						<span className="h-px w-16 bg-gray-300"></span>
						<span className="text-gray-500 font-normal">OR</span>
						<span className="h-px w-16 bg-gray-300"></span>
					</div>

					<Form onFinish={onFinish}>
						<Form.Item
							name="Email"
							rules={[
								{
									required: true,
									message: "Please input your Password!",
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
							name="Password"
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}
							label={
								<label className="theme-font-color">
									Password
								</label>
							}
						>
							<input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="btn btn-blue"
							>
								Log in
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};
export default App;
