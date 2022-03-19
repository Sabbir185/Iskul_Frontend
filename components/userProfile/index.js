/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Avatar from "../../public/images/avatar.png";
import classes from "./userProfile.module.css";
import Cookies from 'js-cookie'
import { useUser } from "../../contexts/userContext";
import Link from 'next/link';


const Profile = () => {
  const { user, logout } = useUser();
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
        className={`absolute text-center ${dropdown ? "invisible" : "block"
          } mt-2 bg-gray-100 py-2 ${classes.profileDropdown
          } border-2 border-gray-200 rounded-md`}
      >
        <li className="flex flex-row items-center mb-2">
          <div className="h-16 w-16 pr-1 mx-2">
            <Image
              src={Avatar}
              alt="default image"
              className={`shrink-0 ${classes.profileImage}`}
            />
          </div>
          <div className="text-center text-gray-700 w-full">
            <h3 className="border-l-2 border-green-500 font-bold tracking-wider">
              {user.firstName?.toUpperCase()}
            </h3>
            <p className="border-l-2 border-green-500 font-semibold tracking-wider">
              {user.role?.toUpperCase()}
            </p>
          </div>
        </li>
        <li className={`cursor-pointer ${classes.dropLink}`}>
          <p>Profile</p>
        </li>

        <li className={`${classes.dropLink} my-1 cursor-pointer`}>
          <p>Inbox</p>
        </li>

        <li className={`cursor-pointer ${classes.dropLink}`} onClick={() => logout()}>
          <p>Sign out</p>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
