'use client'
import { FormEvent, ReactNode } from 'react'
import { Delete } from '../Delete'

interface FormProps {
	submitName: string
	isUpdating?: boolean
	docIdToUpdate: string | null
	loading: boolean
	children: ReactNode
	successMessage: string
	handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> | void
	disableSubmit?: boolean
	formTitle: string
}

const Form = ({
	submitName,
	isUpdating,
	docIdToUpdate,
	loading,
	successMessage,
	children,
	handleSubmit,
	disableSubmit,
	formTitle
}: FormProps) => {
	return (
		<>
			<div className="w-full my-5">
				<h2 className="m-auto max-w-max font-bold text-2xl ">{formTitle}</h2>
			</div>

			<form
				onSubmit={handleSubmit}
				className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
			>
				{children}
				<button
					disabled={disableSubmit}
					type="submit"
					className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded`}
				>
					{loading ? 'Cargando...' : submitName}
				</button>
				{isUpdating && <Delete id={docIdToUpdate} />}

				<span>{successMessage}</span>
			</form>
		</>
	)
}

export default Form
