import axios from "axios";
import Cookies from 'js-cookie';

const deleteUser = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/api/user/delete/${id}`, config);

            if(response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}


const deleteSchool = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/api/school/delete/${id}`, config);

            if(response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}


export { deleteUser, deleteSchool };