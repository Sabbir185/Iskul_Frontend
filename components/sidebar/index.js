import React from "react";
import logo2 from "../../public/images/logo2.png";
import logo11 from "../../public/images/logo11.png";
import logo22 from "../../public/images/logo22.png";
import logo7 from "../../public/images/t7.png";
import logo15 from "../../public/images/t15.png";
import Image from "next/image";
import SidebarNav from "../sidebarMenu/sidebarNav";
import {
	adminSidebarData,
	HeadmasterSidebarData,
	TeacherSidebarData,
	StudentSidebarData
} from "../sidebarMenu/sideNavData";
import { useUser } from "../../contexts/userContext";
import studentLogo from "../../public/images/studentLogo.jpg";


const SideMenu = () => {
	const router = useRouter()
	const { user } = useUser();


	const homePageHandle = () => {

		if (user.role === 'admin') {
			router.push('/admin')
			
		} else if (user.role === 'headmaster') {
			router.push('/school')

		} else if (user.role === 'teacher') {
			router.push('/teacher')

		} else if (user.role === 'student') {
			router.push('/student')
		}
	}


	return (
		<section className="flex flex-col items-center justify-center">

			{/* sidebar header (logo) section, conditionally toggle */}
			{/* Admin logo section */}
			{
				user?.role === 'admin' &&
				<div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2 logo-img">
					<Image className="shrink-0 cursor-pointer" src={logo2} alt="logo" onClick={homePageHandle} />
					<p className="mt-0 pt-0 absolute bottom-2 text-md font-semibold text-cyan-600">
						Skul Management
					</p>
				</div>
			}

			{/* school / headmaster logo section */}
			{
				user?.role === 'headmaster' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5">
					<Image className="shrink cursor-pointer" src={logo22} alt="logo" onClick={homePageHandle} width={150} height={150} />
				</div>
			}


			{/* teacher logo section */}
			{
				user?.role === 'teacher' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5">
					<Image className="shrink cursor-pointer" src={logo22} alt="logo" onClick={homePageHandle} width={150} height={150} />
				</div>
			}


			{/* student logo section */}
			{
				user?.role === 'student' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5">
					<Image className="shrink cursor-pointer" src={logo15} alt="logo" onClick={homePageHandle} width={150} height={150} />
				</div>
			}

			{/* Student logo section */}
			{
				user?.role === 'student' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5 " >
					<Image className="shrink cursor-pointer rounded-full" src={studentLogo} alt="logo" onClick={homePageHandle} width={150} height={150}/>
				</div>
			}


			<div className="mt-8 w-60 h-auto px-6">
				{/* Admin Nav Menu section */}
				{
					user?.role === 'admin' &&
					adminSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}

				{/* school/headmaster Nav Menu section */}
				{
					user?.role === 'headmaster' &&
					HeadmasterSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}

				{/* teacher Nav Menu section */}
				{
					user?.role === 'teacher' &&
					TeacherSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}

				{/* student Nav Menu section */}
				{
					user?.role === 'student' &&
					StudentSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}
			</div>
		</section>
	);
};

export default SideMenu;
