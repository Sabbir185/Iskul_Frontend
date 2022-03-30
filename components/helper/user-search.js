import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useSearchResult } from "../../contexts/searchInputContext";


import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


const UserSearch = () => {
    const { searchResult, setSearchResult } = useSearchResult()


    const onSearch = async (value) => {
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const res = await axios.get(`http://localhost:8080/api/user/get-filtered-data?email=${value}`, config)

            if (res.data.status === true) {
                setSearchResult(res.data.data)
            }

        } catch (error) {
            setSearchResult(error.response.data)
        }
    };


    return (
        <div className="w-64  mx-auto">
            <Search placeholder="Enter email" allowClear onSearch={onSearch}  />
        </div>

    );
};

export default UserSearch;
