import { Link } from 'react-router'
import { Button } from './Button'

export const Header = () => {
	return (
		<div className='fixed left-1/2 -translate-x-1/2  flex justify-between items-center px-4 py-2 rounded-3xl mt-4 shadow-md shadow-gray-300 w-[600px]'>
			<div className='text-2xl'>💅</div>
			<div className='flex gap-x-4'>
				<Link to={'/login'}>
					<Button text='Login' />
				</Link>
				<Link to={'/register'}>
					<Button text='Register' />
				</Link>
			</div>
		</div>
	)
}
