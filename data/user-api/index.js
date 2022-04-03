import { useUser } from '../../contexts/userContext'
import Cookies from 'js-cookie';
import axios from 'axios';


async function getAllTeacherBySchoolId(schoolId) {
    try {
        const token = await Cookies.get('token');
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        const res = await axios.get(`http://localhost:8080/api/user/get-filtered-data?role=teacher&schoolId=${schoolId}`, config, token);

        if (res.data.status === true) {
            return (res.data.data)
        }

    } catch (error) {
        if (error?.response?.data?.message) {
            return (error.response.data.message);

        } else {
            return error.message;
        }
    }
}


export {
    getAllTeacherBySchoolId
}