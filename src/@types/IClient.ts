import { EAlert } from "./IAlert";

export type TUser = {
  user?: boolean | undefined
};

export interface IClient {
  user?: boolean;
  artist_id?: number;
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
  info?: boolean;
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
  data?: any;
};

export interface IPassword {
  email: string;
  password: string;
  confirmpassword: string;
};

export interface IWork {
  work_id?: number;
  title: string;
  price: string;
  description: string;
  evaluation: string;
  picture?: string;
  sold?: boolean;
  artist?: IClient;
  info: boolean;
  likes?: {
    liked: boolean;
    len: number;
  }
}

export interface ICommand{
  picture: string;
  title: string;
  price: number;
  description: string;
  order_date: Date;
  order_location: string;
};