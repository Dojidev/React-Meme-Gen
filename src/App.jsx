import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/Main";

function App() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
