import { useUser } from '../../contexts/userContext'
import Cookies from 'js-cookie';
import axios from 'axios';


async function createNewClass(values) {
    try {
        const token = await Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const response = await axios.post('http://localhost:8080/api/class/create', values, config);

        if (response.data.status === true) {
            return (response.data);
        }

    } catch (error) {
        if (error?.response?.data?.message) {
            return (error.response.data.message);

        } else {
            return ("Failed, maybe you're not authorized!");
        }
    }
}


export {
    createNewClass
}