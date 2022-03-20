import { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import classes from "./inputForm.module.css";
import axios from "axios";
import Cookies from 'js-cookie';

const InputForm = () => {
  const [input, setInput] = useState();
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const token = await Cookies.get('token');
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const res = await axios.get(`http://localhost:8080/api/school/get-filtered-data?schoolEmail=${input}`, config)

      console.log(res);

    } catch (error) {
      console.log(error.response.data)
    }
  };



  return (
    <form
      onClick={formHandler}
      className="flex items-center rounded-lg border-2 border-gray-300"
    >
      <input
        type="text"
        placeholder="search..."
        className="w-auto py-1 pl-4 transform duration-200 focus:pr-8 focus:pl-3 focus:py-1 focus:ring-cyan-500 outline-none text-gray-500 focus:font-semibold"
        onChange={inputHandler}
      />
      <button type="submit" className={`pl-4 ${classes.btnSearch}`}>
        <FaSistrix />
      </button>
    </form>
  );
};

export default InputForm;
