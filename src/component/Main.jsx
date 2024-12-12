import { useEffect } from "react";
import { useState } from "react";

const MemeURL = "https://api.imgflip.com/get_memes";


const Main = () => {
	const [meme, setMeme] = useState({
		topText: "One does not simply",
		bottomText: "Walk into Mordor",
		imageUrl: "http://i.imgflip.com/1bij.jpg",
	});

	const [allMemes, setAllMemes] = useState([]);

	function handleChange(event) {
		const { name, value } = event.currentTarget;

		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}));
	}	

	useEffect(() => {
		fetch(MemeURL)
			.then((respone) => respone.json())
			.then((data) => setAllMemes(data.data.memes));
	}, []);

	function getMemeImg() {
		const randomMeme =
			allMemes[Math.floor(Math.random() * allMemes.length)];
		const randomImgUrl = randomMeme.url;
		setMeme(prevMeme => ({
			...prevMeme, 
			imageUrl: randomImgUrl
		}))
	}
	return (
		<main className="bg-gray-900 min-h-screen flex flex-col items-center px-4">
			{/* Meme Form */}
			<div className="form bg-gray-800 rounded-lg p-6 mt-6 shadow-lg w-full max-w-lg">
				<label className="block text-gray-300 font-medium mb-4">
					Top Text
					<input
						onChange={handleChange}
						type="text"
						placeholder={meme.topText}
						name="topText"
						value={meme.topText}
						className="mt-1 block p-1 w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
					/>
				</label>

				<label className="block text-gray-300 font-medium mb-4">
					Bottom Text
					<input
						onChange={handleChange}
						type="text"
						placeholder={meme.bottomText}
						name="bottomText"
						value={meme.bottomText}
						className="mt-1 p-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
					/>
				</label>

				<button
					onClick={getMemeImg}
					className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-200"
				>
					Get a new meme image 🖼
				</button>
			</div>

			{/* Meme Display */}
			<div className="meme relative mt-6 text-center bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg w-full">
				<img
					src={meme.imageUrl}
					alt="meme"
					className="w-full rounded-md"
				/>
				<span className="top absolute text-white text-xl font-extrabold tracking-wide uppercase inset-x-0 top-6">
					{meme.topText}
				</span>
				<span className="bottom absolute text-white text-xl font-extrabold tracking-wide uppercase inset-x-0 bottom-6">
					{meme.bottomText}
				</span>
			</div>
		</main>
	);
};

export default Main;
