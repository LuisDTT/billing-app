import { type CustomerFormState } from "@/interfaces/CustomerFormState";

export const validateForm = ({
  name = "",
  phoneNumber = "",
  vehiclePlate = "",
  feeValue = 0,
  installments = 0,
}: CustomerFormState["formData"]) => {
  let errors: CustomerFormState["formErrors"] = {};
  const plateRegex = /^[a-zA-Z0-9]*$/; // Regex para evitar caracteres especiales en la placa

  if (name.length < 3 || name.length > 30) {
    errors = {
      ...errors,
      nameError: { err: true, msg: "Debe ingresar un nombre valido" },
    };
  }

  if (
    !Number.isInteger(parseInt(phoneNumber)) ||
    phoneNumber.length < 8 ||
    phoneNumber.length > 12
  ) {
    errors = {
      ...errors,
      phoneError: {
        err: true,
        msg: "Debe ingresar un numero de telefono valido",
      },
    };
  }

  if (vehiclePlate.length !== 6) {
    errors = {
      ...errors,
      plateError: { err: true, msg: "Ingrese un placa valida" },
    };
  } else if (!plateRegex.test(vehiclePlate)) {
    errors = {
      ...errors,
      plateError: {
        err: true,
        msg: "No se permiten simbolos o caracteres especiales",
      },
    };
  }

  if (feeValue === 0 || isNaN(feeValue)) {
    errors = {
      ...errors,
      feeValueError: { err: true, msg: "Debe ingresar un valor" },
    };
  } else if (feeValue.toString().length < 4) {
    errors = {
      ...errors,
      feeValueError: {
        err: true,
        msg: "Debe ingresar un monto superior a 1000",
      },
    };
  }

  if (installments === 0) {
    errors = {
      ...errors,
      installmentsError: { err: true, msg: "Ingrese algun valor" },
    };
  }

  return errors;
};
