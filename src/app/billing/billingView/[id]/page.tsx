import { Billing } from "@/components/billing/Billing";
import { getDocById } from "@/firebase/api";
import { BillingDoc } from "@/interfaces/firebase";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const invoiceData = (await getDocById(id, "invoices")) as BillingDoc;

  if (invoiceData) {
    return <Billing invoiceData={invoiceData} />;
  } else {
    return <h1>La factura no existe</h1>;
  }
};

export default page;
