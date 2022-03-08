import Image from "next/image";
import React from "react";
import logo2 from "../../public/images/logo2.png";

const SideMenu = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2">
        <Image className="shrink-0 " src={logo2} alt="logo" />
        <p className="mt-0 pt-0 absolute bottom-6 text-lg font-bold text-gray-600 odd:">
          Iskul Management
        </p>
      </div>

      <div className="mt-5">
        <p>Main Menu</p>
        <br />
        <h1>Dashboard</h1>
        <h1>Students</h1>
        <h1>Teachers</h1>
        <h1>Departments</h1>
        <h1>Subjects</h1>
        <h1>Others</h1>
        <br />
        <p>Management</p>
        <br />
        <h1>Holiday</h1>
        <h1>Fees</h1>
        <h1>Exam list</h1>
        <h1>Events</h1>
        <h1>Time Table</h1>
        <h1>Library</h1>
      </div>
    </section>
  );
};

export default SideMenu;
