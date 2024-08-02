export const formatNumber = (num: string) => {
	const formattedValue = num
		.replace(/\D/g, '')
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

	const rawValue = formattedValue.replace(/\./g, '')

	return { rawValue, formattedValue }
}
