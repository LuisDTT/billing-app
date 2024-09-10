export interface CustomerFormState {
  formErrors: {
    nameError?: {
      msg: string;
      err: boolean;
    };
    phoneError?: {
      msg: string;
      err: boolean;
    };
    plateError?: {
      msg: string;
      err: boolean;
    };
    feeValueError?: {
      msg: string;
      err: boolean;
    };
    installmentsError?: {
      msg: string;
      err: boolean;
    };
  };

  formData: {
    name: string;
    phoneNumber: string;
    vehiclePlate: string;
    installments: number;
    feeValue: number;
  };
}
