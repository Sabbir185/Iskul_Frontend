import "../styles/globals.css";
import "antd/dist/antd.css";
import "metismenujs/dist/metismenujs.css";
import { UserContextProvider } from "../contexts/userContext";

function MyApp({ Component, pageProps }) {

	return (
		<UserContextProvider>
			<Component {...pageProps} />
		</UserContextProvider>
	);

}

export default MyApp;
