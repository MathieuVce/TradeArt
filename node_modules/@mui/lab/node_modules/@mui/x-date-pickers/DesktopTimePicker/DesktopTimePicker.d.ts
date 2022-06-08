import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { DesktopWrapperProps } from '../internals/components/wrappers/DesktopWrapper';
export interface DesktopTimePickerProps<TDate = unknown> extends BaseTimePickerProps<TDate>, DesktopWrapperProps {
}
declare type DesktopTimePickerComponent = (<TDate>(props: DesktopTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [DesktopTimePicker API](https://mui.com/x/api/date-pickers/desktop-time-picker/)
 */
export declare const DesktopTimePicker: DesktopTimePickerComponent;
export {};
