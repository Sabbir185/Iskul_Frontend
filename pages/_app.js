import "../styles/globals.css";
import "antd/dist/antd.css";
import "metismenujs/dist/metismenujs.css";
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from "../contexts/userContext";
import SearchInputContext from "../contexts/searchInputContext";

function MyApp({ Component, pageProps }) {

	return (
		<UserContextProvider>
			<SearchInputContext>
				<Component {...pageProps} />
			</SearchInputContext>
		</UserContextProvider>
	);

}

export default MyApp;
