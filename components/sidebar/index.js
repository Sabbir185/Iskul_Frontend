import Image from "next/image";
import Link from "next/link";
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
        <Link href="/">
          <a className="text-xl font-bold"> Dashboard</a>
        </Link>
        <br />
        <Link href="/students">
          <a className="text-xl font-bold">Students</a>
        </Link>
        <br />
        <Link href="/teachers">
          <a className="text-xl font-bold">Teachers</a>
        </Link>
        <br />
        <Link href="/departments">
          <a className="text-xl font-bold">Departments</a>
        </Link>
        <br />
        <Link href="/subjects">
          <a className="text-xl font-bold">Subjects</a>
        </Link>
        <br />
        <Link href="/others">
          <a className="text-xl font-bold">Others</a>
        </Link>
        <br />
        <br />
        <p>Management</p>
        <br />
        <Link href="/holiday">
          <a className="text-xl font-bold">Holiday</a>
        </Link>
        <br />
        <Link href="/fees">
          <a className="text-xl font-bold">Fees</a>
        </Link>
        <br />
        <Link href="/examList">
          <a className="text-xl font-bold">Exam list</a>
        </Link>
        <br />
        <Link href="/events">
          <a className="text-xl font-bold">Events</a>
        </Link>
        <br />
        <Link href="/timeTable">
          <a className="text-xl font-bold">Time Table</a>
        </Link>
        <br />
        <Link href="/library">
          <a className="text-xl font-bold">Library</a>
        </Link>
        <br />
      </div>
    </section>
  );
};

export default SideMenu;
