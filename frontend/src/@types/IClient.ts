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

export interface IUser {
  user?: boolean;
  id?: number;
  firstname: string;
  lastname: string;
  username?: string;
  address: {
    address: string;
    postalcode: string;
    city: string;
  };
  birthdate: Date;
  credit_card_number?: string;
  email: string;
  phonenumber: string;
};

export interface IAuth {
  email: string;
  password: string;
  user?: boolean;
};

export interface IRegister {
  login: IAuth;
  details: IClient;
  user?: boolean;
};

export interface IRegisterU {
  login: IAuth;
  details: IUser;
  user?: boolean;
};

export interface IResponse {
  status: EAlert;
  message: string;
};

export interface IPassword {
  email: string;
};