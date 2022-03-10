import "../styles/globals.css";
import "antd/dist/antd.css";
import "metismenujs/dist/metismenujs.css";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
	return (
		<AppContext.Provider>
			<Component {...pageProps} />;
		</AppContext.Provider>
	);
}

export default MyApp;
