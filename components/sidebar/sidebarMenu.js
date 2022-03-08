import { Menu } from "antd";
import { useState } from "react";
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const SidebarMenu = () => {
	const [openKeys, setOpenKeys] = useState(["sub1"]);

	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	return (
		<Menu
			mode="inline"
			openKeys={openKeys}
			onOpenChange={onOpenChange}
			style={{ width: 256 }}
			theme="dark"
		>
			<SubMenu key="sub1" icon={<HomeOutlined />} title="Dashboard">
				<Menu.Item key="1">
					<Link href="/students">
						Student List
					</Link>
				</Menu.Item>
				<Menu.Item key="2">Option 2</Menu.Item>
				<Menu.Item key="3">Option 3</Menu.Item>
				<Menu.Item key="4">Option 4</Menu.Item>
			</SubMenu>
			<SubMenu key="sub2" icon={<AppstoreOutlined />} title="Management">
				<Menu.Item key="5">Option 5</Menu.Item>
				<Menu.Item key="6">Option 6</Menu.Item>
				<SubMenu key="sub3" title="Submenu">
					<Menu.Item key="7">Option 7</Menu.Item>
					<Menu.Item key="8">Option 8</Menu.Item>
				</SubMenu>
			</SubMenu>
			<SubMenu key="sub4" icon={<SettingOutlined />} title="Tools">
				<Menu.Item key="9">Option 9</Menu.Item>
				<Menu.Item key="10">Option 10</Menu.Item>
				<Menu.Item key="11">Option 11</Menu.Item>
				<Menu.Item key="12">Option 12</Menu.Item>
			</SubMenu>
		</Menu>
	);
};

export default SidebarMenu;
