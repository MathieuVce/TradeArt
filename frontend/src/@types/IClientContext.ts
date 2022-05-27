import { IAuth, IClient, IPassword, IRegister, IUser } from "./IClient";

export interface IClientContext {
  client?: null | IClient | IUser;

  login: TLoginFC;
  logout: TLogoutFC;
  register: TRegisterFC;
  resetPassword: TResetPasswwordFC;
};

export type TLogoutFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TRegisterFC = (payload: IRegister) => Promise<any>;
export type TResetPasswwordFC = (payload: IPassword) => Promise<any>;

export const defaultClientValue: IClientContext = {
  client: null,
  
  login: () => Promise.reject(null),
  logout: () => Promise.reject(null),
  register: () => Promise.reject(null),
  resetPassword: () => Promise.reject(null),
};