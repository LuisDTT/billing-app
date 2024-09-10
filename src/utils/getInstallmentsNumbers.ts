export const getInstallmentsNumbers = (
  customerInstallmentsPaid: number,
  invoicedInstallments: number
) => {
  let installmentNumber: number[] = [];
  for (let i = 1; i <= invoicedInstallments; i++) {
    installmentNumber.push(customerInstallmentsPaid + i);
  }

  return installmentNumber;
};
