import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export default function Register() {
	const [full_name, setFullName] = useState('')
	const [phone, setPhone] = useState('')
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const idUser = localStorage.getItem('id_user')
		if (idUser) {
			navigate('/dashboard')
		}
	}, [navigate])

	const handleRegister = async () => {
		const res = await fetch('http://localhost:8080/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ full_name, phone, login, password }),
		})

		const data = await res.json()
		if (res.ok) {
			navigate('/')
		} else {
			alert(data.error)
		}
	}

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-solid border-blue-200 rounded-xl'>
			<p className='text-center text-xl mt-3'>Register</p>
			<div className='flex flex-col gap-y-4 p-5'>
				<div className='flex flex-col gap-y-3'>
					<Input
						placeholder={'Иванов Иван Иванович'}
						label={'ФИО'}
						type={'text'}
						name={'full_name'}
						prop={e => setFullName(e.target.value)}
					/>
					<Input
						placeholder={'88005553535'}
						label={'Телефон'}
						type={'text'}
						name={'phone'}
						prop={e => setPhone(e.target.value)}
					/>
					<Input
						placeholder={'jhondoe'}
						label={'Логин'}
						type={'text'}
						name={'login'}
						prop={e => setLogin(e.target.value)}
					/>
					<Input
						placeholder={'password123'}
						label={'Пароль'}
						type={'password'}
						name={'password'}
						prop={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-center'>
					<Button text={'Register'} prop={handleRegister} />
				</div>
				<p>
					Уже есть аккаунт?{' '}
					<Link
						to={'/'}
						className='text-blue-400 hover:text-blue-500 cursor-pointer duration-200'
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}
