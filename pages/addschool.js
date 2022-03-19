import Layout from "../layout";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react/cjs/react.production.min";

export default function Home() {
  const router = useRouter();
  // const [school, setSchool] = useState();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(
        "http://localhost:8080/school/registration",
        values
      );
      console.log("print", res.data);
      // setSchool(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  // console.log(school);
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">add Student </h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="schoolName"
          rules={[
            {
              required: true,
              message: "Enter School Name",
            },
          ]}
          label={
            <label className="theme-font-color">
              School name
            </label>
          }
        >
          <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create School
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}