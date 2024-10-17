import Link from "next/link";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

export const SideBar = ({
  toggleSideBar,
  showSideBar,
}: {
  toggleSideBar: () => void;
  showSideBar: boolean;
}) => {
  return (
    <div
      className={`h-screen bg-gray-900 z-50 absolute w-full  ${!showSideBar && "hidden"}  text-white md:w-96 md:block md:static`}
    >
      <div className="py-8 mb-10 mx-10 flex justify-between items-center md:justify-center">
        <h1 className="font-bold text-2xl">MI NEGOCIO</h1>
        <TfiClose className="w-8 h-10 md:hidden" onClick={toggleSideBar} />
      </div>
      <nav className="mt-2 flex flex-col items-center text-xl gap-3">
        <Link
          href="/customers"
          className="flex items-center p-4 hover:bg-gray-700"
          onClick={toggleSideBar}
        >
          <FaUser className="mr-3" /> Clientes
        </Link>
        <hr className="border-white w-full" />
        <Link
          href="/billing"
          className="flex items-center p-4 hover:bg-gray-700"
          onClick={toggleSideBar}
        >
          <FaMoneyBill className="mr-3" /> Facturacion
        </Link>
        <hr className="border-white w-full" />
      </nav>
    </div>
  );
};
