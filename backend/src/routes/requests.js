import client from '../db.js'
import { jsonResponse } from '../utils/response.js'

export const getRequests = async (req, res) => {
	const id_user = req.headers['x-user-id']

	if (!id_user) {
		return jsonResponse(res, 400, { error: 'id_user required' })
	}

	try {
		const userResult = await client.query(
			'select id_role from public.user where id = $1',
			[id_user]
		)

		if (userResult.rows.length === 0) {
			return jsonResponse(res, 404, { error: 'User not found' })
		}

		const id_role = userResult.rows[0].id_role

		let query =
			'select r.id, r.booking_datetime, r.id_user, r.id_master, r.id_status, m.name as master_name, s.name as status_name from request r left join master m on r.id_master = m.id left join status s on r.id_status = s.id'
		let values = []

		if (id_role === 1) {
			query += ' where r.id_user = $1'
			values.push(id_user)
		}

		const result = await client.query(query, values)
		const request = result.rows.map(row => ({
			id: row.id,
			booking_datetime: row.booking_datetime,
			id_user: row.id_user,
			master: row.master_name,
			status: row.status_name,
		}))

		jsonResponse(res, 200, request)
	} catch (error) {
		console.log(error)
		jsonResponse(res, 500, { error: 'Server error' })
	}
}

export const createRequest = async (req, res, body) => {
	const id_user = req.headers['x-user-id']

	if (!id_user) {
		return jsonResponse(res, 400, { error: 'id_user required' })
	}

	const { id_master, booking_datetime } = JSON.parse(body)

	if (!id_master || !booking_datetime) {
		jsonResponse(res, 400, {
			error: 'id_master and bookind_datetime are required',
		})
	}

	try {
		await client.query(
			'insert into request (id_user, id_master, id_status, booking_datetime) values ($1, $2, $3, $4)',
			[id_user, id_master, 1, booking_datetime]
		)
		jsonResponse(res, 200, { message: 'Request created successfully' })
	} catch (error) {
		console.log(error)
		jsonResponse(res, 500, { error: 'Server error' })
	}
}

export const updateRequest = async (req, res, body) => {
	const id_user = req.headers['x-user-id']

	if (!id_user) {
		jsonResponse(res, 400, { error: 'id_user required' })
	}

	const { id, id_status } = JSON.parse(body)

	if (!id || !id_status) {
		jsonResponse(res, 400, { error: 'id and id_status are required' })
	}

	try {
		const userResult = await client.query(
			'select id_role from public.user where id = $1',
			[id_user]
		)

		if (userResult.rows.length === 0) {
			jsonResponse(res, 404, { error: 'User not found' })
		}

		const id_role = userResult.rows[0].id_role

		if (id_role === 2) {
			await client.query(
				'update request set id_status = coalesce($1, id_status) where id = $2',
				[id_status, id]
			)
			jsonResponse(res, 200, { message: 'Request updated successfully' })
		} else {
			jsonResponse(res, 404, { error: 'Not found' })
		}
	} catch (error) {
		console.log(error)
		jsonResponse(res, 500, { error: 'Server error' })
	}
}

export const getStatuses = async (req, res) => {
	try {
		const statuses = await client.query('select id, name from status')
		jsonResponse(res, 200, statuses.rows)
	} catch (error) {
		console.log(error)
		jsonResponse(res, 500, { error: 'Server error' })
	}
}

export const getMasters = async (req, res) => {
	try {
		const masters = await client.query('select id, name from master')
		jsonResponse(res, 200, masters.rows)
	} catch (error) {
		console.log(error)
		jsonResponse(res, 500, { error: 'Server error' })
	}
}
