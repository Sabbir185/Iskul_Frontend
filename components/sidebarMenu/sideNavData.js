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
		title: "Class/Subject",
		subtitle: [{ title: 'Add Subject', link: 'school/courses/add-subject' }, { title: 'Create Class', link: 'school/class/create-class' }, { title: 'View Classes', link: 'school/class/view-classes' }, { title: 'View Subjects', link: 'school/courses/view-all' }],
		icon: AppstoreOutlined
	},
	{
		title: "Teacher",
		subtitle: [{ title: 'Add', link: 'school/teacher/add' }, { title: 'View All', link: 'school/teacher/view-all' }],
		icon: ReadOutlined
	},
	{
		title: "Student",
		subtitle: [{ title: 'Add', link: 'school/student/add' }, { title: 'View All', link: 'school/student/view-all' }],
		icon: TeamOutlined
	},
	{
		title: "Notice",
		subtitle: [{ title: 'Create', link: 'school/notice/create-notice' }, { title: 'View All', link: 'school/notice/view-all' }],
		icon: ScheduleOutlined
	},
	{
		title: "About",
		subtitle: [{ title: 'About School', link: 'school/about' }],
		icon: SafetyCertificateOutlined
	},
];



export { adminSidebarData, HeadmasterSidebarData };