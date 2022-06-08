import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { MobileWrapperProps } from '../internals/components/wrappers/MobileWrapper';
export interface MobileDatePickerProps<TDate = unknown> extends BaseDatePickerProps<TDate>, MobileWrapperProps {
}
declare type MobileDatePickerComponent = (<TDate>(props: MobileDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [MobileDatePicker API](https://mui.com/x/api/date-pickers/mobile-date-picker/)
 */
export declare const MobileDatePicker: MobileDatePickerComponent;
export {};
