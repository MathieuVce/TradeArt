import { ParseableDate } from '../models/parseableDate';
import { MuiPickersAdapter } from '../models';
export declare function getTextFieldAriaText<TDate>(rawValue: ParseableDate<TDate>, utils: MuiPickersAdapter<TDate>): string;
export declare const getDisplayDate: <TDate>(utils: MuiPickersAdapter<TDate>, value: ParseableDate<TDate>, inputFormat: string) => string;
export declare function checkMaskIsValidForCurrentFormat(mask: string, format: string, acceptRegex: RegExp, utils: MuiPickersAdapter<any>): boolean;
export declare const maskedDateFormatter: (mask: string, acceptRegexp: RegExp) => (value: string) => string;
