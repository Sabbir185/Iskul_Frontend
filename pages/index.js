import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useUser } from '../contexts/userContext';
import { Spin, Alert } from 'antd';


export default function Home() {
	const { verify } = useUser();
	const router = useRouter();

	useEffect(() => {
		verify().then(user => {
			if (user?.role === 'student') {
				router.push('/student');

			} else if (user?.role === 'admin') {
				router.push('/admin')

			} else if (user?.role === 'headmaster') {
				router.push('/school')

			} else if (user?.role === 'teacher') {
				router.push('/teacher')
			}
		})
	}, [])



	return (
		<div>
			<div className='text-center' style={{marginTop: '10%'}}>
				<Spin tip="Loading..." size="large">
				</Spin>
				<h1 className='font-bold text-xl mt-5 tracking-widest'>Welcome</h1>
			</div>

		</div>
	);
}
