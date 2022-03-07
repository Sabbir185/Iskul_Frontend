import Link from "next/link";

const Sidebar = () => {
	return (
		<div>
			<ul>
				<li className="py-2">
					<Link href="/">
						<a className="p-4">Dashboard</a>
					</Link>
				</li>
				<li className="py-2">
					<Link href="/students">
						<a className="p-4">Students</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
