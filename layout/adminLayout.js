import SideMenu from "../components/sidebar";
import Navbar from "../components/navbar";

const AdminLayout = (props) => {

	const toggleHandler = () => {
		const sidebar = document.querySelector("#sideToggle");
		const navbar = document.querySelector("#navbarToggle");
		const mainT = document.querySelector("#mainToggle");
		
		navbar.getAttribute('layout') === 'navBarToggle'
        ? navbar.removeAttribute('layout')
        : navbar.setAttribute('layout', 'navBarToggle')

		sidebar.getAttribute('layout') === 'sidebarToggle'
        ? sidebar.removeAttribute('layout')
        : sidebar.setAttribute('layout', 'sidebarToggle')

		mainT.getAttribute('layout') === 'mainToggle'
        ? mainT.removeAttribute('layout')
        : mainT.setAttribute('layout', 'mainToggle')

	}

	return (
		<>
			<div className="relative">
				<div id='sideToggle' className={`h-screen md:w-64 fixed mt-0 left-0 top-0`} style={{backgroundColor: "#001529"}}>
					<SideMenu />
				</div>

				<main id="mainToggle" className={`ml-0 md:ml-64 mt-16 p-4`}>
					{props.children}
				</main>

				<div id="navbarToggle" className={`h-16 fixed left-0 md:left-64 top-0 right-0 bg-slate-200`}>
					<Navbar toggleChange={toggleHandler}/>
				</div>
			</div>
		</>
	);
};
export default AdminLayout;
