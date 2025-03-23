import { Route } from 'react-router'
import { Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/Notfound'
import Request from './pages/Request'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/dashboard/create' element={<Request />} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
