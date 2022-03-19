import logo2 from "../public/images/logo.png";
import Image from "next/image";
import SchoolSideNavbar from "./schoolSideNavbar";
const SchoolSidebar = () =>{

	return (
		<>
		<section className="flex flex-col items-center justify-center">
			<div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2">
				<Image className="shrink-0 " src={logo2} alt="logo" />
				<p className="mt-0 pt-0 absolute bottom-2 text-md font-semibold text-cyan-600">
					Little Angel Kindar Garden
				</p>
			</div>
			<div className="mt-10 w-full h-auto ml-8">
				<SchoolSideNavbar></SchoolSideNavbar>
			</div>
		</section>
		</>
	);
};

export default SchoolSidebar;
