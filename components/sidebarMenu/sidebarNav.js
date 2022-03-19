import React from "react";
import Link from "next/link";
import MetisMenu from "@metismenu/react";
import "metismenujs/dist/metismenujs.css";
import classes from "./sidebarMenu.module.css";
import SubNavList from "./sidebarNavLi";


const SidebarNav = ({ data }) => {
	const {title, icon:Icon} = data;
	const subData = data.subtitle;

	return (
		<React.Fragment>
			<MetisMenu>
				<li className="font-semibold text-lg pb-2">
					<Link href="" passHref className="has-arrow">
						<div className="flex items-center gap-2 text-cyan-500">
							<Icon />
							<a href="" className="text-gray-400">
								{title}
							</a>
						</div>
					</Link>
					<ul>
						{
							subData?.map((d, i, a) => <SubNavList key={i} title={d.title} link={d.link}/>)
						}

					</ul>
				</li>

			</MetisMenu>
		</React.Fragment>
	);
};

export default SidebarNav;
