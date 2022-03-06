import Link from "next/link";

const Navbar = () => {
	return (
		<section>
			<div>
				<form>
					<input id="search" placeholder="search" />
					<button>Search</button>
				</form>
			</div>
			<div>
				<ul>
					<li>
						<Link href="/text">Test</Link>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Navbar;
