import pg from 'pg'

const { Client } = pg

const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'pg-container',
	// host: "localhost",
	database: 'demo',
})

await client
	.connect()
	.then(() => console.log('Connected to PG'))
	.catch(err => console.error('Connection error', err))

export default client
