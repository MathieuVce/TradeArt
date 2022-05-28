import { EAlert } from "./IAlert";

export type TUser = {
  user?: boolean | undefined
};

export interface IClient {
  user?: boolean;
  id?: number;
  email: string;
  birthdate: Date;
  lastname: string;
  firstname: string;
  bank_account_number?: string;
  address: {
    address: string;
    postalcode: string;
    city: string;
  };
  phonenumber: string;
  institution?: string;
  cursus?: string;
  description?: string;
  photo?: string;
};

export interface IAuth {
  email: string;
  password: string;
};

export interface IRegister {
  login: IAuth;
  details: IClient;
};

export interface IResponse {
  status: EAlert;
  message: string;
};

export interface IPassword {
  email: string;
  password: string;
  confirmpassword: string;
};