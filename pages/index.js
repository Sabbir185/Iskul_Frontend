import  Layout  from '../layout/adminLayout';
import { useRouter } from 'next/router'
import { useEffect } from "react";
// import Cookies from 'js-cookie';
// import jwt_decode from "jwt-decode";
import { useUser } from '../contexts/userContext';


export default function Home() {
	const { user, verify } = useUser();
	const router = useRouter();

	useEffect(()=>{
		verify()
	},[])

	useEffect(()=>{
		
		if (user?.role === 'student') {
			router.push('/student');
	
		} else if (user?.role === 'admin') {
			router.push('/admin')
	
		} else if (user?.role === 'school') {
			router.push('/school')
		}

	},[user])

	console.log(user)

	return (
		<>
			<h1 className="text-3xl font-bold  text-center mt-32">
				Welcome .....
			</h1>
		</>
	);
}
