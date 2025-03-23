export const Input = ({
	placeholder = '',
	label,
	type,
	name,
	prop,
	extra = '',
}) => {
	return (
		<div className='flex flex-col gap-y-2'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				id={name}
				className={`outline-none p-3 rounded-xl border-2 border-solid border-blue-400 text-black font-semibold duration-200 focus:border-blue-600 placeholder:text-slate-400 ${extra}`}
				placeholder={placeholder}
				onChange={prop}
				min={type === 'time' ? '08:00' : ''}
				max={type === 'time' ? '18:00' : ''}
			/>
		</div>
	)
}
