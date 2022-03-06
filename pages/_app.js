import Layout from "../layout/index";
import Navbar from "../layout/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Navbar />
			<Component {...pageProps} />;
		</Layout>
	);
}

export default MyApp;
