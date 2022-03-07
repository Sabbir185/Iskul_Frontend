import Link from "next/link";
import { AiOutlineAlignLeft } from "react-icons/ai";
import classes from "./navbar.module.css";
import InputForm from "../helper/inputForm";
import Profile from "../userProfile";
import Notifications from "../helper/notifications";

const Navbar = ({ toggleChange }) => {
	return (
		<section className="flex flex-row items-center justify-between">
			<div className="flex pt-4 pl-10">
				<div className="flex items-center pr-5">
					<AiOutlineAlignLeft
						className={classes.icon1}
						onClick={toggleChange}
					/>
				</div>
				<InputForm />
			</div>

			<div className="flex items-center">
				<Notifications />
				<Profile />
			</div>
		</section>
	);
};

export default Navbar;
