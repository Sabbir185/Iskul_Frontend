import { AiOutlineAlignLeft } from "react-icons/ai";
import { useUser } from "../../contexts/userContext";
import InputForm from "../helper/inputForm";
import Notifications from "../helper/notifications";
import Profile from "../userProfile";
import classes from "./navbar.module.css";

const Navbar = ({ toggleChange }) => {
  const { user } = useUser();

  return (
    <section className="flex flex-row items-center justify-between">
      <div className="flex pt-2 pl-10">
        <div className="flex items-center pr-5">
          <AiOutlineAlignLeft
            className={classes.icon1}
            onClick={toggleChange}
          />
        </div>

        {/* navbar search input for admin*/}
        {
          user?.role === 'admin' &&
          <InputForm />
        }

        {/* navbar title for school management*/}
        {
          user?.role === 'headmaster' &&
          <h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3">{user.schoolId.schoolName?.toUpperCase()}</h1>
        }
      </div>

      <div className="flex items-center">
        <Notifications />
        <Profile />
      </div>
    </section>
  );
};
export default Navbar;
