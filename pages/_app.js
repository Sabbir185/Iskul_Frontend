import "../styles/globals.css";
import "antd/dist/antd.css";
import "metismenujs/dist/metismenujs.css";
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from "../contexts/userContext";
import SearchInputContext from "../contexts/searchInputContext";
import { useRouter } from "next/router";
import PasswordReset from "./reset";


function MyApp({ Component, pageProps }) {
	const router = useRouter()

	const pathForPublic = router.asPath.split('/')

	if (pathForPublic.includes('reset')) {

		return (
			<PasswordReset pathForPublic={pathForPublic}/>
		)
	}

	return (
		<UserContextProvider>
			<SearchInputContext>
				<Component {...pageProps} />
			</SearchInputContext>
		</UserContextProvider>
	);

}

export default MyApp;
