"use client";
import { getAll } from "@/firebase/api";
import { CustomerDoc } from "@/interfaces/firebase";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { formatNumber } from "@/utils/formatNumber";
import { Table, TableData, TableRow } from "@/components/Table";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<CustomerDoc[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAll("customers");
      setData(result as CustomerDoc[]);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="m-7">
        <div className="flex justify-end ">
          <Link href={"customers/new"} className="">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
              <FaPlus /> Registrar nuevo cliente
            </button>
          </Link>
        </div>
        <Table
          headings={[
            "Nombre",
            "Telefono",
            "Placa",
            "Cuotas asignadas",
            "Cuotas canceladas",
            "Saldo abonado",
            "Valor de cuota",
          ]}
        >
          {data.map((customer, index) => (
            <TableRow index={index} key={customer.docId}>
              <TableData data={customer.name} />
              <TableData data={customer.phoneNumber} />
              <TableData data={customer.vehiclePlate} />
              <TableData data={customer.installments || "No se asignaron"} />
              <TableData data={customer.installmentsPaid || 0} />
              <TableData
                data={`$${customer.creditedBalance ? formatNumber(customer.creditedBalance).formattedValue : "0"}`}
              />
              <TableData
                data={`${customer.feeValue ? "$" + formatNumber(customer.feeValue).formattedValue : "Sin valor"}`}
              />
              <TableData
                data={
                  <Link
                    href={`customers/edit/${customer.docId}`}
                    className="text-blue-500 hover:text-blue-700 "
                  >
                    <FaEdit className="size-6" />
                  </Link>
                }
              />
            </TableRow>
          ))}
        </Table>
        {data.length === 0 && <p className="text-center">No hay datos</p>}
      </div>
    </>
  );
};

export default Page;
