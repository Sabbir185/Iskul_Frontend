import { useUser } from '../../contexts/userContext'
import Cookies from 'js-cookie';
import axios from 'axios';

// const token = await Cookies.get('token');
// const config = {
//     headers: { 'Authorization': `Bearer ${token}` }
// }

async function getAllClassRoomBySchoolId(id) {
    try {
        const res = await axios.get(`http://localhost:8080/api/class-room/filtered-classroom-by-schoolId/${id}`);

        if (res.data.status === true) {
            return (res.data)
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
    getAllClassRoomBySchoolId
}