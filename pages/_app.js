import "../styles/globals.css";
import "antd/dist/antd.css";
import "metismenujs/dist/metismenujs.css";
import { useRouter } from 'next/router'
import { UserContextProvider } from "../contexts/userContext";

function MyApp({ Component, pageProps }) {

	return (
		<UserContextProvider>
			<Component {...pageProps} />;
		</UserContextProvider>
	);

}

export default MyApp;
