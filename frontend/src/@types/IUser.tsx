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