import {
	AppstoreOutlined,
	SettingOutlined,
	HomeOutlined,
	ReadOutlined,
	TeamOutlined,
	SafetyCertificateOutlined
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


const teacherSidebarData = [

	{
		title: "Dashboard",
		subtitle: [{ title: 'Admin', link: 'admin/view-all' }, { title: 'Teachers', link: 'admin/view-all/teacher' }, { title: 'Students', link: 'admin/view-all/student' }, { title: 'Headmasters', link: 'admin/view-all/headmaster' }],
		icon: AppstoreOutlined
	},
	{
		title: "School",
		subtitle: [{ title: 'Add', link: 'admin/school/registration' }, { title: 'Set Admin', link: 'a' }, { title: 'Update Info', link: 'a' }, { title: 'View All', link: 'school/view-all' }],
		icon: ReadOutlined
	},
	{
		title: "Teacher",
		subtitle: [{ title: 'Add', link: 'a' }, { title: 'Details', link: 'a' }, { title: 'Update Info', link: 'a' }, { title: 'View All', link: 'a' }],
		icon: SafetyCertificateOutlined
	},
	{
		title: "Student",
		subtitle: [{ title: 'Add', link: 'student' }, { title: 'Details', link: 'a' }, { title: 'Update Info', link: 'a' }, { title: 'View All', link: 'student/view-all' }],
		icon: TeamOutlined
	},
];


export { adminSidebarData, teacherSidebarData };