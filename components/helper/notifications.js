import { FaRegBell } from "react-icons/fa";
import { IoMegaphoneOutline } from "react-icons/io5";


const Notifications = () => {
  return (
    <div
      className="h-3 mr-8 cursor-pointer text-cyan-600"
      style={{fontSize: "23px" }}
    >
      <IoMegaphoneOutline />
    </div>
  );
};

export default Notifications;
