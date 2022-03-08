/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Avatar from "../../public/images/avatar.png";
import classes from "./userProfile.module.css";

const Profile = () => {
  const [dropdown, setDropdown] = useState(true);

  const dropdownHandler = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  return (
    <div className="relative mr-10">
      <div
        onClick={dropdownHandler}
        className="flex items-center justify-center pt-2 cursor-pointer pr-5"
      >
        <div className="h-9 w-9">
          <Image
            src={Avatar}
            alt="default image"
            className={`shrink-0 ${classes.profileImage}`}
          />
        </div>
        {dropdown ? (
          <button className="pl-1 inline-block text-lg">
            <AiFillCaretDown />
          </button>
        ) : (
          <button className="pl-1 inline-block text-lg">
            <AiFillCaretUp />
          </button>
        )}
      </div>

      <ul
        className={`absolute text-center ${
          dropdown ? "invisible" : "block"
        } mt-2 bg-gray-200 py-2 ${
          classes.profileDropdown
        } border-2 border-gray-300`}
      >
        <li className="flex flex-row items-center mb-2">
          <div className="h-16 w-16 pr-1 mx-1">
            <Image
              src={Avatar}
              alt="default image"
              className={`shrink-0 ${classes.profileImage}`}
            />
          </div>
          <div className=" text-left text-gray-700 ">
            <h3 className="border-green-500 border-l-2 pl-1 font-semibold tracking-wider">
              Sabbir
            </h3>
            <p className=" border-l-2 pl-1 border-green-500 font-semibold tracking-wider ">
              Teacher
            </p>
          </div>
        </li>
        <li className={classes.dropLink}>
          <a href="">Profile</a>
        </li>

        <li className={`${classes.dropLink} border-y-2 border-gray-50 my-1`}>
          <a href="">Inbox</a>
        </li>

        <li className={classes.dropLink}>
          <a href="">Sign out</a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
