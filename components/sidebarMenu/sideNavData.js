import {
	AppstoreOutlined,
	SettingOutlined,
	HomeOutlined,
	ReadOutlined,
	TeamOutlined,
	SafetyCertificateOutlined,
	ScheduleOutlined
} from "@ant-design/icons";


const adminSidebarData = [

	{
		title: "Dashboard",
		subtitle: [{ title: 'Admin', link: 'admin/view-all' }, { title: 'Teachers', link: 'admin/view-all/teacher' }, { title: 'Students', link: 'admin/view-all/student' }, { title: 'Headmasters', link: 'admin/view-all/headmaster' }],
		icon: AppstoreOutlined
	},
	{
		title: "School",
		subtitle: [{ title: 'Add School', link: 'admin/school/registration' }, { title: 'Set Admin', link: 'admin/school/assign-admin' }, { title: 'Update Info', link: 'admin/school/update-school-info' }, { title: 'View All', link: 'admin/school/view-all' }],
		icon: ReadOutlined
	}
];


const HeadmasterSidebarData = [
	{
		title: "Dashboard",
		subtitle: [{ title: 'Create Class', link: 'admin/view-all' }, { title: 'Update Class', link: 'admin/view-all/teacher' }, { title: 'View Classes', link: 'admin/view-all/headmaster' }],
		icon: AppstoreOutlined
	},
	{
		title: "Teacher",
		subtitle: [{ title: 'Add', link: 'a' }, { title: 'Search', link: 'a' }, { title: 'View All', link: 'a' }],
		icon: ReadOutlined
	},
	{
		title: "Student",
		subtitle: [{ title: 'Add', link: 'student' }, { title: 'Search', link: 'a' }, { title: 'View All', link: 'student/view-all' }],
		icon: TeamOutlined
	},
	{
		title: "Notice",
		subtitle: [{ title: 'Create', link: 'student' }, { title: 'Search', link: 'a' }, { title: 'View All', link: 'student/view-all' }],
		icon: ScheduleOutlined
	},
	{
		title: "About",
		subtitle: [{ title: 'About School', link: 'school/about' }],
		icon: SafetyCertificateOutlined
	},
];



export { adminSidebarData, HeadmasterSidebarData };