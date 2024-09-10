"use client";
import { BillingDoc } from "@/interfaces/firebase";
import { getFormattedDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { getInstallmentsNumbers } from "@/utils/getInstallmentsNumbers";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    color: "#444",
    fontSize: "8px",
    padding: "15px",
  },

  heading1: {
    textAlign: "center",
    marginBottom: " 3px",
  },
  heading2: {
    textAlign: "center",
    marginBottom: " 3px",
  },
  heading3: {
    textAlign: "center",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#000",
    fontWeight: "bold",
    marginRight: 200,
  },
  text: {
    marginBottom: "3px",
    textTransform: "uppercase",
  },
  hr: {
    borderBottom: "0.8px solid #000",
    width: "100%",
    margin: "12px 0",
  },
});

interface BillingProps {
  invoiceData: BillingDoc;
}

export const BillingPDF = ({ invoiceData }: BillingProps) => {
  const {
    billingId,
    createdAt,
    customerName,
    user,
    vehiclePlate,
    description,
    newCreditedBalance,
    oldCreditedBalance,
    receivedFee,
    totalAmount,
    invoicedInstallments,
    customerInstallmentsPaid,
  } = invoiceData;

  const installmentsNumber = getInstallmentsNumbers(
    customerInstallmentsPaid,
    invoicedInstallments
  );

  return (
    <Document>
      <Page size={[230, 230]} orientation="portrait" style={styles.page}>
        <Text> </Text>
        <Text style={styles.text}>
          <Text style={styles.subtitle}>Nº FACTURA:</Text>
          {billingId}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.subtitle}>FECHA DE EMISION:</Text>{" "}
          {getFormattedDate(createdAt.seconds)}
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
          <Text style={styles.subtitle}>TARIFA RECIBIDA:</Text>
          <Text> </Text>
          {`$${formatNumber(receivedFee).formattedValue}`}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subtitle}>SALDO ABONADO:</Text>
          <Text> </Text>
          {`$${formatNumber(oldCreditedBalance).formattedValue}`}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subtitle}>VALOR TOTAL:</Text>
          <Text> </Text>
          {`$${formatNumber(totalAmount).formattedValue}**`}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subtitle}>NUEVO SALDO ABONADO:</Text>
          <Text> </Text>
          {`$${formatNumber(newCreditedBalance).formattedValue}**`}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subtitle}>CANTIDAD DE CUOTAS PAGADAS:</Text>
          <Text> </Text>
          {`${invoicedInstallments}`}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.subtitle}>NUMERO DE CUOTA:</Text>
          <Text> </Text>
          {installmentsNumber.map((num, index) =>
            index == 0 ? num : ", " + num
          )}
        </Text>
      </Page>
    </Document>
  );
};
