"use client";
import { Table, TableData, TableRow } from "@/components/Table";
import { getAll, getDocById } from "@/firebase/api";
import { BillingDoc, CustomerDoc } from "@/interfaces/firebase";
import { getFormattedDate } from "@/utils/formatDate";
import Link from "next/link";
import { RiBillLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import PDFDownloadButton from "@/components/billing/DownloadButton";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<BillingDoc[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAll("invoices");
      setData(result as BillingDoc[]);
    };
    fetchData();
  }, []);

  const getInstallmentsPaidFromCustomer = async (id: string) => {
    const { installmentsPaid } = (await getDocById(
      id,
      "customers"
    )) as CustomerDoc;
    return installmentsPaid;
  };

  return (
    <>
      <div className="m-7 h-full">
        <div className="flex justify-end ">
          <Link href={"billing/new"} className="">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
              <RiBillLine /> Crear nueva factura
            </button>
          </Link>
        </div>
        <Table
          headings={[
            "ID Factura",
            "Placa",
            "Cliente",
            "Total de cuotas",
            "Fecha y hora de facturacion",
          ]}
        >
          {data.map((invoice, index) => (
            <TableRow index={index} key={invoice.billingId}>
              <TableData data={invoice.billingId} />
              <TableData data={invoice.vehiclePlate} />
              <TableData data={invoice.customerName} />
              <TableData data={`${invoice.invoicedInstallments}`} />

              <TableData data={getFormattedDate(invoice.createdAt.seconds)} />
              <TableData
                data={
                  <div className="flex gap-3 justify-center">
                    <Link
                      href={`/billing/billingView/${invoice.docId}`}
                      className=""
                    >
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-full">
                        <FaEye />
                      </button>
                    </Link>
                    <PDFDownloadButton
                      invoiceData={invoice}
                      buttonName={<IoMdDownload />}
                    />
                  </div>
                }
              />
            </TableRow>
          ))}
        </Table>
      </div>
    </>
  );
};

export default Page;
