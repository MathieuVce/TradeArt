import { IAuth, IClient, IPassword, IRegister, IWork } from "./IClient";

export interface IClientContext {
  client?: null | IClient;

  login: TLoginFC;
  logout: TLogoutFC;  
  update: TUpdateFC;
  getWork: TGetWorkFC;
  autolog: TAutoLogFC;
  register: TRegisterFC;
  deleteWork: TDeleteWorkFC;
  createWork: TCreateWorkFC;
  resetPassword: TResetPasswwordFC;
  receivePayment: TReceivePaymentFC;
};

export type TLogoutFC = () => Promise<any>;
export type TGetWorkFC = () => Promise<any>;
export type TAutoLogFC = () => Promise<any>;
export type TLoginFC = (payload: IAuth) => Promise<any>;
export type TCreateWorkFC = (work: IWork) => Promise<any>;
export type TUpdateFC = (payload: IClient) => Promise<any>;
export type TRegisterFC = (payload: IRegister) => Promise<any>;
export type TReceivePaymentFC = (artist_id: number) => Promise<any>;
export type TResetPasswwordFC = (payload: IPassword) => Promise<any>;
export type TDeleteWorkFC = (payload: {work_id: number}) => Promise<any>;

export const defaultClientValue: IClientContext = {
  client: null,
  
  login: () => Promise.reject(null),
  logout: () => Promise.reject(null),
  update: () => Promise.reject(null),
  getWork: () => Promise.reject(null),
  autolog: () => Promise.reject(null),
  register: () => Promise.reject(null),
  deleteWork: () => Promise.reject(null),
  createWork: () => Promise.reject(null),
  resetPassword: () => Promise.reject(null),
  receivePayment: () => Promise.reject(null),
};