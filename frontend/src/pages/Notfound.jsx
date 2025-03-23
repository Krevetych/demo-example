import { Link } from 'react-router'
import { Button } from '../components/Button'

export default function NotFound() {
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl gap-y-3 font-bold flex flex-col'>
			<div className='text-center'>
				<p>404</p>
				<p>Not found</p>
			</div>
			<Link to={'/dashboard'}>
				<Button text={'Go Home'} />
			</Link>
		</div>
	)
}
