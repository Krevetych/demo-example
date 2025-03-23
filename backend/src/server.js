import url from 'url'
import http from 'http'
import { login, register } from './routes/auth.js'
import {
	createRequest,
	getMasters,
	getRequests,
	getStatuses,
	updateRequest,
} from './routes/requests.js'

const PORT = 8080

const setCors = res => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-User-ID')
}

const handleRequest = (req, res) => {
	const parseUrl = url.parse(req.url, true)
	const { pathname } = parseUrl
	setCors(res)

	if (req.method === 'OPTIONS') {
		res.writeHead(204)
		return res.end()
	}

	if (req.method === 'POST' && pathname === '/register') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => register(req, res, body))
	} else if (req.method === 'POST' && pathname === '/login') {
		let body = ''
		req.on('data', chunk => (body += chunk))
		req.on('end', () => login(req, res, body))
	} else if (req.method === 'GET' && pathname === '/requests') {
		getRequests(req, res)
	} else if (req.method === 'POST' && pathname === '/requests') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => createRequest(req, res, body))
	} else if (req.method === 'PUT' && pathname === '/requests') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => updateRequest(req, res, body))
	} else if (req.method === 'GET' && pathname === '/statuses') {
		getStatuses(req, res)
	} else if (req.method === 'GET' && pathname === '/masters') {
		getMasters(req, res)
	}
}

const server = http.createServer(handleRequest)

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
