"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BillingPDF } from "./BillingPDF";
import { useEffect, useState } from "react";
import { BillingDoc } from "@/interfaces/firebase";

interface DownloadButtonProps {
  invoiceData: BillingDoc;
  buttonName?: React.ReactNode;
}

export const DownloadButton = ({
  invoiceData,
  buttonName,
}: DownloadButtonProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    //Este efecto es para evitar el error react-pdf, que solo se pueda usar en client side
    setIsClient(true); //Al momento de que se cargue el componente cambiar el estado a true para poder utilizar react-pdf
  }, []);
  return isClient ? (
    <PDFDownloadLink
      document={<BillingPDF invoiceData={invoiceData} />}
      fileName={`factura-${invoiceData.billingId}.pdf`}
    >
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {buttonName ? buttonName : "Imprimir factura"}
      </button>
    </PDFDownloadLink>
  ) : (
    <span>Cargando...</span>
  );
};

export default DownloadButton;
