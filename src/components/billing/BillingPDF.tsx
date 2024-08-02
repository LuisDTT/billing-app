'use client'
import { BillingDoc } from '@/interfaces/firebase'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
	page: {
		color: '#444',
		fontSize: '8px',
		padding: '15px'
	},

	heading1: {
		textAlign: 'center',
		marginBottom: ' 3px'
	},
	heading2: {
		textAlign: 'center',
		marginBottom: ' 3px'
	},
	heading3: {
		textAlign: 'center',
		marginBottom: '20px',
		textTransform: 'uppercase'
	},
	subtitle: {
		color: '#000',
		fontWeight: 'bold',
		marginRight: 200
	},
	text: {
		marginBottom: '3px',
		textTransform: 'uppercase'
	},
	hr: {
		borderBottom: '0.8px solid #000',
		width: '100%',
		margin: '12px 0'
	}
})

interface MyPdfProps {
	data: {
		customerName?: string
		vehiclePlate?: string
		billingId?: string
		fee?: string
		createdAt?: string
		amountLeft?: string
		user?: string
		description?: string
	}
}

export const BillingPDF = ({ data }: MyPdfProps) => {
	const {
		billingId,
		createdAt,
		customerName,
		amountLeft,
		fee,
		user,
		vehiclePlate,
		description
	} = data
	return (
		<Document>
			<Page size={[250, 200]} orientation="portrait" style={styles.page}>
				<Text> </Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>Nº FACTURA:</Text>
					{billingId}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>FECHA DE EMISION:</Text> {createdAt}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>USUARIO:</Text> {user}
				</Text>

				<Text style={styles.hr}></Text>

				<Text style={styles.text}>
					<Text style={styles.subtitle}>CLIENTE:</Text>
					<Text> </Text>
					{customerName}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>PLACA:</Text>
					<Text> </Text>
					{vehiclePlate}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>CONCEPTO:</Text>
					<Text> </Text>
					{description}
				</Text>

				<Text style={styles.hr}></Text>

				<Text style={styles.text}>
					<Text style={styles.subtitle}>VALOR:</Text>
					<Text> </Text>
					{`$${fee}`}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>VALOR RESTANTE:</Text>
					<Text> </Text>
					{`$${amountLeft}`}
				</Text>
			</Page>
		</Document>
	)
}
