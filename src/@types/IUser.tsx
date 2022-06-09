import { IAuth } from "./IClient";

export interface IUser {
  user?: boolean;
  customer_id?: number;
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

export interface IRegisterU {
  login: IAuth;
  details: IUser;
};

export interface IPaymentValues {
  amount: number;
  ccnumber: string;
  ccexp: Date;
  cccvc: string;
  save: boolean;
  address: {
    address: string;
    postalcode: string;
    city: string;
  };
};

export interface ICreateOrder {
  save: number;
  work_id: number;
  customer_id: number;
  orderlocation: string;
  price: number;
  credit_card_number: string;
};

export interface ILike {
  work_id?: number;
  customer_id?: number;
};