import { FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";
const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-2">
			<div className="max-w-screen-xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
				<p className="flex justify-center items-center gap-2 text-sm text-white font-medium">
					&copy; {new Date().getFullYear()} DojiDev
					<img
						height={30}
						width={30}
						src={logo}
						alt="logo of doji dev"
					/>
				</p>
				<div className="flex space-x-4 items-center">
					<a
						href="https://github.com/Dojidev"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-emerald-200"
					>
						<FaGithub size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
