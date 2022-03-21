import React from "react";
import logo2 from "../../public/images/logo2.png";
import Image from "next/image";
import SidebarNav from "../sidebarMenu/sidebarNav";
import { adminSidebarData } from "../sidebarMenu/sideNavData";
import { useUser } from "../../contexts/userContext";
import {useRouter} from 'next/router'


const SideMenu = () => {
	const router = useRouter()
	const {user} = useUser();

	const homePageHandle = () => {
		if(user.role === 'admin') {
			router.push('/admin')
		}
	}


	return (
		<section className="flex flex-col items-center justify-center">
			<div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2 logo-img">
				<Image className="shrink-0 cursor-pointer" src={logo2} alt="logo" onClick={homePageHandle}/>
				<p className="mt-0 pt-0 absolute bottom-2 text-md font-semibold text-cyan-600">
					Skul Management
				</p>
			</div>

			<div className="mt-10 w-60 h-auto px-6">
				{
					adminSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}
			</div>
		</section>
	);
};

export default SideMenu;
