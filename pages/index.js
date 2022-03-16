import {useRouter} from 'next/router'
import AdminLayout from "../layout/adminLayout";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";


export default function Home() {
	const router = useRouter();
    const [user, setUser] = useContext(UserContext)

	const token = Cookies.get('token');
	const jwt = `${token}`

	useEffect(()=>{
		if(token) {
			const decoded = jwt_decode(jwt);
			setUser(decoded)
		} else {
			router.push('/login')
		}

	},[jwt, setUser, token])

	if(user.role === 'student') {
		router.push('/students')
	} else if(user.role === 'admin') {
		router.push('/')
	}



	return (
		<>
			<h1 className="text-3xl font-bold  text-center mt-32">
				Welcome .....
			</h1>
		</>
	);
}
