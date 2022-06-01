import { IRegisterU, IUser } from "./IUser";
import { IAuth, IPassword } from "./IClient";

export interface IUserContext {
  user?: null | IUser;

  loginU: TLoginFC;
  logoutU: TLogoutFC;
  updateU: TUpdateFC;
  autologU: TAutoLogFC;
  registerU: TRegisterFC;
  resetPasswordU: TResetPasswwordFC;
};

export type TLogoutFC = () => Promise<any>;
export type TAutoLogFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TUpdateFC = (payload: IUser) => Promise<any>;
export type TRegisterFC = (payload: IRegisterU) => Promise<any>;
export type TResetPasswwordFC = (payload: IPassword) => Promise<any>;


export const defaultUserValue: IUserContext = {
  user: null,
  
  loginU: () => Promise.reject(null),
  updateU: () => Promise.reject(null),
  autologU: () => Promise.reject(null),
  logoutU: () => Promise.reject(null),
  registerU: () => Promise.reject(null),
  resetPasswordU: () => Promise.reject(null),
};