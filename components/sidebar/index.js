import React from "react";
import logo2 from "../../public/images/logo2.png";
import Image from "next/image";
import SidebarNav from "./sidebarNav";

const SideMenu = () => {
	

	return (
		<section className="flex flex-col items-center justify-center">
			<div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2">
				<Image className="shrink-0 " src={logo2} alt="logo" />
				<p className="mt-0 pt-0 absolute bottom-2 text-md font-semibold text-gray-400">
					Skul Management
				</p>
			</div>

			<div className="mt-10 w-full h-auto ml-8">
				<SidebarNav/>
			</div>
		</section>
	);
};

export default SideMenu;
