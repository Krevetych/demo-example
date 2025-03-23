import client from '../db.js'
import { hashPassword } from '../utils/hash.js'
import { jsonResponse } from '../utils/response.js'

export const register = async (req, res, body) => {
	const { login, password, full_name, phone } = JSON.parse(body)

	if (!login || !password) {
		return jsonResponse(res, 400, {
			error: 'Login and password are required',
		})
	}

	const oldUser = await client.query(
		'select * from public.user where login = $1',
		[login]
	)

	if (oldUser.rows.length > 0) {
		return jsonResponse(res, 400, {
			error: 'User already exists',
		})
	}

	const hashedPassword = hashPassword(password)

	try {
		await client.query(
			'insert into public.user (id_role, login, password, full_name, phone) values ($1, $2, $3, $4, $5)',
			[1, login, hashedPassword, full_name, phone]
		)
		jsonResponse(res, 201, { message: 'User registered successfully' })
	} catch (error) {
		console.log(error)
		jsonResponse(res, 500, { error: 'Unknown error' })
	}
}

export const login = async (req, res, body) => {
	const { login, password } = JSON.parse(body)

	if (!login || !password) {
		return jsonResponse(res, 400, {
			error: 'Login and password are required',
		})
	}

	const hashedPassword = hashPassword(password)

	try {
		const result = await client.query(
			'select * from public.user where login = $1 and password = $2',
			[login, hashedPassword]
		)
		if (result.rows.length > 0) {
			jsonResponse(res, 200, {
				message: 'Login successful',
				data: { ...result.rows[0] },
			})
		} else {
			jsonResponse(res, 401, { error: 'Invalid login or password' })
		}
	} catch (error) {
		jsonResponse(res, 500, { error: 'Unknown error' })
	}
}
