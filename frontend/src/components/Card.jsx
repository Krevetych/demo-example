import { useState } from 'react'
import { Button } from './Button'

export const Card = ({
	id,
	master,
	status,
	booking_datetime,
	statuses = [],
	role,
}) => {
	const currentStatus = statuses.length
		? statuses.find(s => s.name === status)?.id || ''
		: ''

	const [selectedStatus, setSelectedStatus] = useState(currentStatus)
	const [isEditing, setIsEditing] = useState(false)

	const handleStatusChange = e => {
		setSelectedStatus(Number(e.target.value))
		setIsEditing(true)
	}

	const handleStatusUpdate = async () => {
		try {
			const res = await fetch('http://localhost:8080/requests', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-User-ID': localStorage.getItem('id_user'),
				},
				body: JSON.stringify({
					id: id,
					id_status: selectedStatus,
				}),
			})

			if (res.ok) {
				setIsEditing(false)
			} else {
				console.log('Ошибка при обновлении статуса')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			key={id}
			className='flex items-center justify-between border-2 border-solid border-blue-200 px-4 py-2 m-5 rounded-2xl'
		>
			<div>
				<p className='font-semibold text-xl'>
					Мастер: <span className='font-normal'>{master}</span>
				</p>
				<p className='font-semibold text-xl'>
					Дата и время:{' '}
					<span className='font-normal'>
						{new Date(booking_datetime).toLocaleString('ru-RU', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
				</p>
			</div>
			<div>
				{role == 2 ? (
					<div>
						<select
							value={selectedStatus}
							onChange={handleStatusChange}
							className='p-3 border-2 border-solid border-blue-400 rounded-xl'
						>
							{statuses.map(item => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
						{isEditing && (
							<Button text={'Ok'} prop={handleStatusUpdate} extra='ml-2' />
						)}
					</div>
				) : (
					<p
						className={`${
							status === 'Новое'
								? 'text-blue-400'
								: status === 'Подтверждено'
								? 'text-green-400'
								: 'text-red-400'
						} text-xl font-semibold`}
					>
						{status}
					</p>
				)}
			</div>
		</div>
	)
}
