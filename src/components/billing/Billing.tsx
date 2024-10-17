import {type BillingDoc } from "@/interfaces/firebase";
import { BillingViewer } from "./BillingViewer";
import DownloadButton from "./DownloadButton";

interface BillingProps {
  invoiceData: BillingDoc;
}

export const Billing = ({ invoiceData }: BillingProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 m-10">
      {/* {Modal} */}
      <h3 className="font-bold text-2xl">Detalle de factura</h3>
      <BillingViewer invoiceData={invoiceData} />
      <DownloadButton invoiceData={invoiceData}></DownloadButton>
    </div>
  );
};
