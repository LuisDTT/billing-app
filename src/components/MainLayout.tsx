"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import axios from "axios";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [sectionName, setSectionName] = useState<string | null>("");
  const [userName, setUserName] = useState<string>("");
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (pathName === "/") {
      setSectionName("Inicio");
    } else if (pathName?.includes("customers")) {
      setSectionName("Clientes");
    } else if (pathName?.includes("billing")) {
      setSectionName("Facturacion");
    } else if (pathName === "/login") {
      setSectionName(null);
    }
  }, [pathName]);

  useEffect(() => {
    async function getUserData() {
      const userName = localStorage.getItem("userName");
      if (userName) {
        setUserName(userName);
      }
    }

    getUserData();
  }, []);

  const handleLogOut = async () => {
    await axios.post("/api/auth/logoutHandler");
    router.push("/login");
    router.refresh();
  };
  return (
    <div className="flex relative min-w-96">
      <div
        className={`h-screen bg-gray-900 z-50 absolute w-full ${!showSideBar && "hidden"} text-white md:w-96 md:block md:static`}
      >
        <div className="py-8 mb-10 mx-10 flex justify-between items-center md:justify-center">
          <h1 className="font-bold text-2xl">MI NEGOCIO</h1>
          <TfiClose
            className="w-8 h-10 md:hidden"
            onClick={() => setShowSideBar(!showSideBar)}
          />
        </div>
        <nav className="mt-2 flex flex-col items-center text-xl gap-3">
          <Link
            href="/customers"
            className="flex items-center p-4 hover:bg-gray-700"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <FaUser className="mr-3" /> Clientes
          </Link>
          <hr className="border-white w-full" />
          <Link
            href="/billing"
            className="flex items-center p-4 hover:bg-gray-700"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <FaMoneyBill className="mr-3" /> Facturacion
          </Link>
          <hr className="border-white w-full" />
        </nav>
      </div>
      <div className="w-full bg-slate-50 h-screen overflow-auto flex flex-col">
        {sectionName && (
          <header className="h-max flex justify-between items-center p-5 border-b-2 border-gray-300 bg-white md:px-16">
            <CiMenuBurger
              className="mr-4 hover:bg-slate-200 w-7 h-5 md:hidden"
              onClick={() => setShowSideBar(!showSideBar)}
            />
            <h2 className="font-bold grow ">{sectionName}</h2>
            <h3>Hola, {userName} 👋</h3>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-8"
              onClick={handleLogOut}
            >
              Cerrar sesion
            </button>
          </header>
        )}
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
};
