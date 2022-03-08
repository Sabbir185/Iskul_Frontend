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
          Skul Management
        </p>
      </div>

      <div className="mt-5">
        <Link href="/">
          <a> Dashboard</a>
        </Link>
        <br />
        <Link href="/students">
          <a>Students Page</a>
        </Link>
      </div>
    </section>
  );
};

export default SideMenu;
