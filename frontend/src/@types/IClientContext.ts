import { IAuth, IClient, IPassword, IRegister } from "./IClient";

export interface IClientContext {
  client?: null | IClient;

  login: TLoginFC;
  logout: TLogoutFC;  
  getWork: TGetWorkFC;
  autolog: TAutoLogFC;
  register: TRegisterFC;
  resetPassword: TResetPasswwordFC;
};

export type TLogoutFC = () => Promise<any>;
export type TGetWorkFC = () => Promise<any>;
export type TAutoLogFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TRegisterFC = (payload: IRegister) => Promise<any>;
export type TResetPasswwordFC = (payload: IPassword) => Promise<any>;

export const defaultClientValue: IClientContext = {
  client: null,
  
  login: () => Promise.reject(null),
  logout: () => Promise.reject(null),
  getWork: () => Promise.reject(null),
  autolog: () => Promise.reject(null),
  register: () => Promise.reject(null),
  resetPassword: () => Promise.reject(null),
};