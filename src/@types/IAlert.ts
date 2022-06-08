export interface IAlert {
  message: string;
  duration?: number;
};

type TAlertPayload = {
  message: string;
  duration?: number;
};

export type TAlerts = {
  info: TAlertMethod;
  error: TAlertMethod;
  success: TAlertMethod;
  warning: TAlertMethod;
};

type TAlertMethod = (value: TAlertPayload) => void;

export enum EAlert {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error'
};