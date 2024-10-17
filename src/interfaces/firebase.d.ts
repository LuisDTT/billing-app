export interface CustomerDoc {
  docId?: string;
  name: string;
  phoneNumber: string;
  vehiclePlate: string;
  feeValue: number;
  installments: number;
  installmentsPaid: number;
  creditedBalance: number;
}

export interface BillingDoc {
  docId?: string;
  billingId: string;
  customerName: string;
  vehiclePlate: string;
  createdAt: { seconds: number } | FirebaseFirestoreTypes.Timestamp
  user: string;
  description: string;
  customerId: string;
  receivedFee: number;
  totalAmount: number;
  oldCreditedBalance: number;
  newCreditedBalance: number;
  invoicedInstallments: number;
  customerInstallmentsPaid: number;
}

export interface AdminUser {
  email: string;
  name: string;
}
