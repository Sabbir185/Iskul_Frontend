import React from "react";
import logo from "../../public/images/logo.png";
import logo2 from "../../public/images/logo2.png";
import Image from "next/image";
import SidebarMenu from './sidebarMenu'

const SideMenu = () => {
	return (
		<section className="flex flex-col items-center justify-center">
			<div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2">
				<Image className="shrink-0 " src={logo2} alt="logo" />
				<p className="mt-0 pt-0 absolute bottom-2 text-lg font-normal text-gray-400">
					Skul Management
				</p>
			</div>

			<div className="mt-10">
				<SidebarMenu/>
			</div>
		</section>
	);
};

export default SideMenu;
