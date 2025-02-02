import { useEffect, useState, useRef } from "react";
import { SketchPicker } from "react-color";

const MemeURL = "https://api.imgflip.com/get_memes";

const Main = () => {
	const [meme, setMeme] = useState({
		topText: "One does not simply",
		bottomText: "Walk into Mordor",
		imageUrl: "http://i.imgflip.com/1bij.jpg",
		topTextColor: "#ffffff",
		bottomTextColor: "#ffffff",
	});

	const [allMemes, setAllMemes] = useState([]);
	const [showColorPicker, setShowColorPicker] = useState(null); // null = no picker open

	const colorPickerRef = useRef(null);

	useEffect(() => {
		// Fetch meme data
		fetch(MemeURL)
			.then((response) => response.json())
			.then((data) => setAllMemes(data.data.memes));
	}, []);

	useEffect(() => {
		// Function to handle click outside
		function handleClickOutside(event) {
			if (
				colorPickerRef.current &&
				!colorPickerRef.current.contains(event.target)
			) {
				setShowColorPicker(null); // Close the color picker if click is outside
			}
		}

		// Attach the event listener to the document
		document.addEventListener("mousedown", handleClickOutside);

		// Clean up event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	function handleChange(e) {
		const { name, value } = e.currentTarget;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}));
	}

	function getMemeImg() {
		const randomMeme =
			allMemes[Math.floor(Math.random() * allMemes.length)];
		setMeme((prevMeme) => ({
			...prevMeme,
			imageUrl: randomMeme.url,
		}));
	}

	function handleColorChange(color, target) {
		setMeme((prevMeme) => ({
			...prevMeme,
			[target]: color.hex, // Update color state
		}));
	}

	// Function to toggle color picker dynamically based on text (top/bottom)
	function toggleColorPicker(e, target) {
		// Toggle color picker visibility
		setShowColorPicker((prev) => (prev === target ? null : target));
	}

	return (
		<main className="flex flex-col flex-grow justify-center items-center  sm:p-8 md:p-10 ">
			{/* Meme Form */}
			<div className="flex flex-col flex-grow justify-center items-center m-2">
				<div className="form bg-gray-800 rounded-lg p-4 mt-6 shadow-lg w-full max-w-lg">
					{/* Top Text Input + Color Picker */}
					<div className="relative w-full mb-4">
						<label className="block text-gray-300 font-medium mb-2">
							Top Text
						</label>
						<div className="flex items-center relative">
							<input
								onChange={handleChange}
								type="text"
								placeholder={meme.topText}
								name="topText"
								value={meme.topText}
								className="w-full p-2 pr-10 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
							/>
							<div
								className="absolute right-2 w-8 h-8 cursor-pointer border border-gray-600 rounded-md"
								style={{ backgroundColor: meme.topTextColor }}
								onClick={(e) =>
									toggleColorPicker(e, "topTextColor")
								}
							></div>
						</div>
						{showColorPicker === "topTextColor" && (
							<div
								ref={colorPickerRef}
								className="absolute z-10 mb-2 bg-white p-2 shadow-lg rounded-md"
							>
								<SketchPicker
									color={meme.topTextColor}
									onChange={(color) =>
										handleColorChange(color, "topTextColor")
									}
								/>
							</div>
						)}
					</div>

					{/* Bottom Text Input + Color Picker */}
					<div className="relative w-full mb-4">
						<label className="block text-gray-300 font-medium mb-2">
							Bottom Text
						</label>
						<div className="flex items-center relative">
							<input
								onChange={handleChange}
								type="text"
								placeholder={meme.bottomText}
								name="bottomText"
								value={meme.bottomText}
								className="w-full p-2 pr-10 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-500 "
							/>
							<div
								className="absolute right-2 w-8 h-8 cursor-pointer border border-gray-600 rounded-md"
								style={{
									backgroundColor: meme.bottomTextColor,
								}}
								onClick={(e) =>
									toggleColorPicker(e, "bottomTextColor")
								}
							></div>
						</div>
						{showColorPicker === "bottomTextColor" && (
							<div
								ref={colorPickerRef}
								className="absolute z-10 mb-2 bg-white p-2 shadow-lg rounded-md"
							>
								<SketchPicker
									color={meme.bottomTextColor}
									onChange={(color) =>
										handleColorChange(
											color,
											"bottomTextColor"
										)
									}
								/>
							</div>
						)}
					</div>

					{/* Button to Get New Meme */}
					<button
						onClick={getMemeImg}
						className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-200"
					>
						Get a new meme image 🖼
					</button>
				</div>

				{/* Meme Display */}
				<div className="meme relative mt-2 mb-6 text-center bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg w-full">
					<img
						src={meme.imageUrl}
						alt="meme"
						className="w-full rounded-md"
					/>
					<span
						className="top absolute text-xl font-extrabold tracking-wide uppercase inset-x-0 top-6"
						style={{ color: meme.topTextColor }}
					>
						{meme.topText}
					</span>
					<span
						className="bottom absolute text-xl font-extrabold tracking-wide uppercase inset-x-0 bottom-6"
						style={{ color: meme.bottomTextColor }}
					>
						{meme.bottomText}
					</span>
				</div>
			</div>
		</main>
	);
};

export default Main;
