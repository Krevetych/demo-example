export const Button = ({ text, extra = '', prop = () => {} }) => {
	return (
		<button
			className={`bg-blue-500 px-2 py-1 rounded-md text-white hover:bg-blue-600 cursor-pointer duration-300 ${extra}`}
			onClick={prop}
		>
			{text}
		</button>
	)
}
