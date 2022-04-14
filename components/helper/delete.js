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

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
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

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
        }

    } else {
        return false
    }
}

const deleteSubject = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/api/subject/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
        }

    } else {
        return false
    }
}


const deleteClass = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/api/class/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
        }

    } else {
        return false
    }
}



const deleteNotice = async (id) => {
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/api/notice/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
        }

    } else {
        return false
    }
}


const deleteRoutine = async (id) => {
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/api/routine/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
        }

    } else {
        return false
    }
}


const deleteStudentFromClass = async (clsId, stdId) => {
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const data = {
                students: stdId
            }
            const response = await axios.patch(`http://localhost:8080/api/class/delete-student-from-class/${clsId}`, data, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error?.response?.data
        }

    } else {
        return false
    }
}



export { 
    deleteUser, 
    deleteSchool, 
    deleteSubject, 
    deleteClass, 
    deleteNotice,
    deleteRoutine,
    deleteStudentFromClass
 };