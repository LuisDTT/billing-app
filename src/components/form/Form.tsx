"use client";
import { FormEvent, ReactNode } from "react";
import { Delete } from "../Delete";

interface FormProps {
  submitName: React.ReactNode;
  isUpdating?: boolean;
  docIdToUpdate: string | null;
  loading: boolean;
  children: ReactNode;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> | void;
  disableSubmit?: boolean;
  formTitle: string;
}

const Form = ({
  submitName,
  isUpdating,
  docIdToUpdate,
  loading,
  children,
  handleSubmit,
  disableSubmit,
  formTitle,
}: FormProps) => {
  return (
    <div>
      <div className="w-full my-5">
        <h2 className="m-auto max-w-max font-bold text-2xl ">{formTitle}</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md min-w-96 md:mx-auto mx-2 p-4  bg-white rounded shadow-md"
      >
        {children}
        <button
          disabled={disableSubmit}
          type="submit"
          className={`w-full ${isUpdating ? "bg-green-500" : "bg-blue-500"} ${loading && "bg-gray-500"}  text-white p-2 rounded`}
        >
          {loading ? "Validando datos..." : submitName}
        </button>
        {isUpdating && <Delete id={docIdToUpdate} />}
      </form>
    </div>
  );
};

export default Form;
