import { useEffect, useState } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router'

export default function Request() {
	const [masters, setMasters] = useState()
	const [selectedMaster, setSelectedMaster] = useState()
	const [date, setDate] = useState()
	const [time, setTime] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		const idUser = localStorage.getItem('id_user')

		if (idUser) {
			navigate('/dashboard/create')
		} else {
			navigate('/')
		}

		fetch('http://localhost:8080/masters', {
			method: 'GET',
		})
			.then(res => res.json())
			.then(data => setMasters(data))
	}, [navigate])

	const handleMasterChange = e => {
		setSelectedMaster(e.target.value)
	}

	const handleCreate = async () => {
		const formattedDate = `${date} ${time}`

		const res = await fetch('http://localhost:8080/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-User-ID': localStorage.getItem('id_user'),
			},
			body: JSON.stringify({
				id_master: selectedMaster,
				booking_datetime: formattedDate,
			}),
		})

		const data = res.json()

		if (res.ok) {
			alert('Запись успешно создана')
			setDate('')
			setTime('')
			setSelectedMaster('')
		} else {
			alert(data.error)
		}
	}

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-solid border-blue-200 rounded-xl'>
			<div className='flex items-center justify-around mt-3'>
				<p className='text-center text-xl'>Create Request</p>
			</div>
			<div className='flex flex-col gap-y-4 p-5'>
				<div className='flex flex-col gap-y-3'>
					<label>Мастер</label>
					<select
						value={selectedMaster}
						onChange={handleMasterChange}
						className='p-3 border-2 border-solid border-blue-400 rounded-xl'
					>
						<option value={''}>Выберите своего мастера</option>
						{masters &&
							masters.map(item => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
					</select>
					<Input
						label={'Дата'}
						type={'date'}
						name={'date'}
						prop={e => setDate(e.target.value)}
					/>
					<Input
						label={'Время'}
						type={'time'}
						name={'time'}
						prop={e => setTime(e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-center'>
					<Button text={'Create'} prop={handleCreate} />
				</div>
				<p>
					Передумали?{' '}
					<Link
						to={'/dashboard'}
						className='text-blue-400 hover:text-blue-500 cursor-pointer duration-200'
					>
						Dashboard
					</Link>
				</p>
			</div>
		</div>
	)
}
