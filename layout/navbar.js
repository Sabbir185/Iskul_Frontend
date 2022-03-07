import Link from "next/link";
import { render } from 'react-dom';
//import { Router, Route, hashHistory } from 'react-router';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import React from 'react';

const Menu1 = () => <div><u>Menu 1 View</u></div>;
const Menu2 = () => <div><i>Menu 2 View</i></div>;
const SubMenu = () => <div><s>SubMenu View</s></div>;

const menu = [
  {
    icon: 'dashboard',
    label: 'Menu 1',
    to: 'menu-1',
  },
  {
    icon: 'bell',
    label: 'Menu 2',
    to: 'menu-2',
  },
  {
    icon: 'bolt',
    label: 'Menu 3',
    content: [
      {
        icon: 'bolt',
        label: 'Sub Menu',
        to: 'sub-menu',
      },
    ],
  },
  {
    icon: 'external-link',
    label: 'External Link',
    externalLink: true,
    to: 'https://www.google.com',
  },
];


const Navbar = (props) => {
	<div>
    <MetisMenu
      content={menu}
      LinkComponent={RouterLink}
    />
    <h2>Page Content</h2>
    {props.children || "Greeter Page"}
  </div>

render(
	<>
	  {/* <Link href="/" component={App} /> */}
		<Link href="/login" component={Menu1} />
		<Link href="/signup" component={Menu2} />
		<Link href="/student" component={SubMenu} />
	</>
  );
}
export default Navbar;
