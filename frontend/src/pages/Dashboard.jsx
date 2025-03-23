import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

export default function Dashboard() {
	const navigate = useNavigate()
	const [fio, setFio] = useState('')
	const [role, setRole] = useState('')
	const [requests, setRequests] = useState([])
	const [statuses, setStatuses] = useState([])

	useEffect(() => {
		const idRole = localStorage.getItem('id_role')
		fetch('http://localhost:8080/requests', {
			method: 'GET',
			headers: { 'X-User-ID': localStorage.getItem('id_user') },
		})
			.then(res => res.json())
			.then(data => setRequests(data))

		if (idRole == 2) {
			fetch('http://localhost:8080/statuses', {
				method: 'GET',
				headers: { 'X-User-ID': localStorage.getItem('id_user') },
			})
				.then(res => res.json())
				.then(data => setStatuses(data))
		}
	}, [])

	useEffect(() => {
		const idUser = localStorage.getItem('id_user')
		setFio(localStorage.getItem('full_name'))
		setRole(localStorage.getItem('id_role'))
		if (idUser) {
			navigate('/dashboard')
		} else {
			navigate('/')
		}
	}, [navigate])

	const handleLogout = () => {
		localStorage.clear()
		navigate('/')
	}

	return (
		<div>
			<div className='flex items-center justify-around m-3'>
				{role == 1 ? (
					<div>
						<Link to={'/dashboard/create'}>
							<Button
								text={'Create request'}
								extra='bg-green-400 hover:bg-green-500'
							/>
						</Link>
					</div>
				) : null}
				<div className='flex gap-x-3 items-center'>
					<p className='text-xl font-semibold'>{fio}</p>
					<Button
						text={'Logout'}
						extra='bg-red-400 hover:bg-red-500'
						prop={handleLogout}
					/>
				</div>
			</div>

			{requests.map(item => (
				<div key={item.id}>
					<Card
						id={item.id}
						master={item.master}
						status={item.status}
						booking_datetime={item.booking_datetime}
						role={role}
						statuses={statuses}
					/>
				</div>
			))}
		</div>
	)
}
