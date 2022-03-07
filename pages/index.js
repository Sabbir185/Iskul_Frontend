import Link from "next/link";
import Layout from "../layout";

export default function Home() {
	return (
		<Layout>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<Link href="/text">Test</Link>
			<Link href="./Login/login.js">login</Link>
		</Layout>
	);
}
