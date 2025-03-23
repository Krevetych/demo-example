import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export default function Login() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const idUser = localStorage.getItem('id_user')
		if (idUser) {
			navigate('/dashboard')
		}
	}, [navigate])

	const handleLogin = async () => {
		const res = await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
		})

		const data = await res.json()
		if (res.ok) {
			localStorage.setItem('id_user', data.data.id)
			localStorage.setItem('id_role', data.data.id_role)
			localStorage.setItem('full_name', data.data.full_name)
			navigate('/dashboard')
		} else {
			alert(data.error)
		}
	}

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-solid border-blue-200 rounded-xl'>
			<p className='text-center text-xl mt-3'>Login</p>
			<div className='flex flex-col gap-y-4 p-5'>
				<div className='flex flex-col gap-y-3'>
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
					<Button text={'Login'} prop={handleLogin} />
				</div>
				<p>
					Еще нет аккаунта?{' '}
					<Link
						to={'/register'}
						className='text-blue-400 hover:text-blue-500 cursor-pointer duration-200'
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	)
}
