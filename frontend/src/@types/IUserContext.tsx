import { IAuth, IPassword } from "./IClient";
import { IRegisterU, IUser } from "./IUser";

export interface IUserContext {
  user?: null | IUser;

  loginU: TLoginFC;
  logoutU: TLogoutFC;
  registerU: TRegisterFC;
  resetPasswordU: TResetPasswwordFC;
};

export type TLogoutFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TRegisterFC = (payload: IRegisterU) => Promise<any>;
export type TResetPasswwordFC = (payload: IPassword) => Promise<any>;

export const defaultUserValue: IUserContext = {
  user: null,
  
  loginU: () => Promise.reject(null),
  logoutU: () => Promise.reject(null),
  registerU: () => Promise.reject(null),
  resetPasswordU: () => Promise.reject(null),
};