import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { MobileWrapperProps } from '../internals/components/wrappers/MobileWrapper';
export interface MobileTimePickerProps<TDate = unknown> extends BaseTimePickerProps<TDate>, MobileWrapperProps {
}
declare type MobileTimePickerComponent = (<TDate>(props: MobileTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Time Picker](https://mui.com/x/react-date-pickers/time-picker/)
 *
 * API:
 *
 * - [MobileTimePicker API](https://mui.com/x/api/date-pickers/mobile-time-picker/)
 */
export declare const MobileTimePicker: MobileTimePickerComponent;
export {};
