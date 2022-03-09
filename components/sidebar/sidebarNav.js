import React from "react";
import Link from "next/link";
import MetisMenu from "@metismenu/react";
import "metismenujs/dist/metismenujs.css";
import classes from "./sidebar.module.css";
import {
	AppstoreOutlined,
	SettingOutlined,
	HomeOutlined,
} from "@ant-design/icons";

const SidebarNav = () => {
	return (
		<React.Fragment>
			<MetisMenu>
				<li className="font-semibold text-xl pb-2">
					<Link href="" passHref className="has-arrow">
						<div className="flex items-center gap-2 text-cyan-500">
							<HomeOutlined />
							<a href="" className="text-gray-400">
								Dashboard
							</a>
						</div>
					</Link>
					<ul>
						<li className={classes.navLink1}>
							<Link href="/students">Student List</Link>
						</li>
						<li className={classes.navLink1}>
							<Link href="/students">Teacher List</Link>
						</li>
						<li className={classes.navLink1}>
							<Link href="/students">Staff List</Link>
						</li>
					</ul>
				</li>

				<li className="font-semibold text-xl pb-2">
					<Link href="" passHref className="has-arrow">
						<div className="flex items-center gap-2 text-cyan-500">
							<AppstoreOutlined />
							<a href="" className="text-gray-400">
								Management
							</a>
						</div>
					</Link>
					<ul>
						<li className={classes.navLink1}>
							<Link href="/students">Coming Soon</Link>
						</li>
						<li className={classes.navLink1}>
							<Link href="/students">Coming Soon</Link>
						</li>
						<li className={classes.navLink1}>
							<Link href="/students">Coming Soon</Link>
						</li>
					</ul>
				</li>

				<li className="font-semibold text-xl">
					<Link href="" passHref className="has-arrow">
						<div className="flex items-center gap-2 text-cyan-500">
							<SettingOutlined />
							<a href="" className="text-gray-400">
								Activities
							</a>
						</div>
					</Link>
					<ul>
						<li className={classes.navLink1}>
							<Link href="/students">Coming Soon</Link>
						</li>
						<li className={classes.navLink1}>
							<Link href="/students">Coming Soon</Link>
						</li>
						<li className={classes.navLink1}>
							<Link href="/students">Coming Soon</Link>
						</li>
					</ul>
				</li>
        
			</MetisMenu>
		</React.Fragment>
	);
};

export default SidebarNav;