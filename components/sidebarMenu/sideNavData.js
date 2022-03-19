import {
	AppstoreOutlined,
	SettingOutlined,
	HomeOutlined,
	ReadOutlined,
	TeamOutlined,
	SafetyCertificateOutlined
} from "@ant-design/icons";

const sidebarData = [

	{
		title: "Dashboard",
		subtitle: [{ title: 'Admin', link: 'admin' }, { title: 'Teachers', link: 'teacher/view-all' }, { title: 'Students', link: 'student/view-all' }, { title: 'Headmasters', link: 'a' }],
		icon: AppstoreOutlined
	},
	{
		title: "School",
		subtitle: [{ title: 'Add', link: 'school' }, { title: 'Set Admin', link: 'a' }, { title: 'Update Info', link: 'a' }, { title: 'View All', link: 'a' }],
		icon: ReadOutlined
	},
	{
		title: "Teacher",
		subtitle: [{ title: 'Add', link: 'a' }, { title: 'Details', link: 'a' }, { title: 'Update Info', link: 'a' }, { title: 'View All', link: 'a' }],
		icon: SafetyCertificateOutlined
	},
	{
		title: "Student",
		subtitle: [{ title: 'Add', link: 'student' }, { title: 'Details', link: 'a' }, { title: 'Update Info', link: 'a' }, { title: 'View All', link: 'a' }],
		icon: TeamOutlined
	},
]

export default sidebarData;