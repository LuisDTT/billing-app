'use client'
import { navigate } from '@/app/customers/actions'
import { AdminUser } from '@/interfaces/firebase'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)
		try {
			const res = await axios.post('/api/auth/loginHandler', {
				email,
				password
			})
			if (res.data) {
				try {
					const res = await axios.get('/api/user')
					const userData = res.data as AdminUser
					localStorage.setItem('userName', userData.name)
					localStorage.setItem('email', userData.email)
					navigate('/')
				} catch {
					console.log('Ha ocurrido un error inesperado')
				}
			}
		} catch (error) {
			const { response } = error as AxiosError

			switch (response?.data) {
				case 'auth/invalid-credential':
					setError(
						'Este usuario no tiene autorizacion o ha digitado un email o contraseña incorrecto'
					)
					break
				case 'auth/invalid-email':
					setError('Ingrese un email valido')
					break
				case 'auth/missing-password':
					setError('Ingrese una contraseña valida')
					break
				default:
					setError('Ha ocurrido un error, Intetalo nuevamente')
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
					Autenticación
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<div className="">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Clave
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							required
						/>
					</div>
					<span className="text-red-300 text-center block w-full text-md">
						{error && error}
					</span>
					<div className="flex items-center justify-between mt-4">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
						>
							Ingresar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
