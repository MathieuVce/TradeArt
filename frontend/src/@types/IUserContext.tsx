import { IAuth, IPassword } from "./IClient";
import { ICreateOrder, IRegisterU, IUser } from "./IUser";

export interface IUserContext {
  user?: null | IUser;

  loginU: TLoginFC;
  logoutU: TLogoutFC;
  updateU: TUpdateFC;
  autologU: TAutoLogFC;
  getWorks: TGetWorksFC;
  registerU: TRegisterFC;
  createOrder: TCreateOrderFC;
  resetPasswordU: TResetPasswwordFC;
};

export type TLogoutFC = () => Promise<any>;
export type TAutoLogFC = () => Promise<any>;
export type TGetWorksFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TUpdateFC = (payload: IUser) => Promise<any>;
export type TRegisterFC = (payload: IRegisterU) => Promise<any>;
export type TCreateOrderFC = (payload: ICreateOrder) => Promise<any>;
export type TResetPasswwordFC = (payload: IPassword) => Promise<any>;


export const defaultUserValue: IUserContext = {
  user: null,
  
  loginU: () => Promise.reject(null),
  updateU: () => Promise.reject(null),
  logoutU: () => Promise.reject(null),
  getWorks: () => Promise.reject(null),
  autologU: () => Promise.reject(null),
  registerU: () => Promise.reject(null),
  createOrder: () => Promise.reject(null),
  resetPasswordU: () => Promise.reject(null),
};