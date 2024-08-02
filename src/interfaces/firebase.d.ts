export interface CustomerDoc {
	docId?: string
	name?: string
	phoneNumber?: string
	vehiclePlate?: string
	totalAmount?: string
	amountLeft?: string
}

export interface BillingDoc {
	docId?: string
	customerName?: string
	vehiclePlate?: string
	billingId?: string
	fee?: string
	createdAt: Timestamp
	amountLeft?: string
	user?: string
	description?: string
	customerId?: string
}

export interface AdminUser {
	email: string
	name: string
}
