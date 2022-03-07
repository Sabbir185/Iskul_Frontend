import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useState } from "react";

const Layout = (props) => {
	const [toggle, setToggle] = useState(true);

	const toggleHandler = () => {
		if(toggle===false){
			setToggle(true)
		}else{
			setToggle(false)
		}
	}
	
	console.log(toggle)

	return (
		<>
			<div className="relative">
				<div className={`${toggle?"block md:w-64":"hidden"} h-screen fixed mt-0 left-0 top-0 bg-green-300`}>
					<Sidebar />
				</div>

				<main className={`ml-0 ${toggle?"md:ml-64":""} mt-16 p-4`}>
					{props.children}
				</main>

				<div className={`h-16 fixed left-0 ${toggle?"md:left-64":""} top-0 right-0 bg-slate-100`}>
					<Navbar toggleChange={toggleHandler}/>
				</div>
			</div>
		</>
	);
};

export default Layout;
