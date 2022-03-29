import {
	AppstoreOutlined, AuditOutlined, BookOutlined, FundOutlined, NotificationOutlined, ReadOutlined, SafetyCertificateOutlined,
	ScheduleOutlined, TeamOutlined
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
		subtitle: [{ title: 'Add Subject', link: 'school/courses/add-subject' }, { title: 'Create Class', link: 'school/class/create-class' }, { title: 'View Classes', link: 'school/class/view-classes' }, { title: 'View Subjects', link: 'school/courses/view-all' }],
		icon: AppstoreOutlined
	},
	{
		title: "Teacher",
		subtitle: [{ title: 'Add', link: 'school/teacher/add' }, { title: 'Search', link: 'school/teacher/search' }, { title: 'View All', link: 'school/teacher/view-all' }],
		icon: ReadOutlined
	},
	{
		title: "Student",
		subtitle: [{ title: 'Add', link: 'school/student/add' }, { title: 'Search', link: 'school/student/search' }, { title: 'View All', link: 'school/student/view-all' }],
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


// Student Side bar Data
const StudentSidebarData = [
	{
		title: "Classes",
		subtitle: [{ title: 'View Classes', link: 'student/classes/view-classes' }],
		icon: BookOutlined 
	},
	{
		title: "Routine",
		subtitle: [{ title: 'Class Routine', link: 'student/routine/view-routine' }],
		icon: FundOutlined
	},
	{
		title: "Teachers",
		subtitle: [{ title: 'Course Teachers', link: 'student/teachers/course-teachers' }],
		icon: AuditOutlined
	},
	{
		title: "Notice",
		subtitle: [{ title: 'All Notice', link: 'student/notice/view-notice' }],
		icon: NotificationOutlined
	}
];



export { adminSidebarData, HeadmasterSidebarData, StudentSidebarData };

