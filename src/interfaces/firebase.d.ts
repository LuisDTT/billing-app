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

// export interface CustomerDoc {
//   docId?: string;
//   name?: string;
//   phoneNumber?: string;
//   vehiclePlate?: string;
//   feeValue?: string;
//   installments?: string; //Cambiar a number
//   feesPaid?: number;
//   creditedBalance?: string;
// }

export interface BillingDoc {
  docId?: string;
  billingId: string;
  customerName: string;
  vehiclePlate: string;
  createdAt: Timestamp | { seconds: number };
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
