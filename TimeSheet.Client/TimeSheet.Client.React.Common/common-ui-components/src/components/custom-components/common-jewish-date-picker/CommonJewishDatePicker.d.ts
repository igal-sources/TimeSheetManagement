import { BasicJewishDate } from 'react-jewish-datepicker';
import './common-jewish-datePicker.css';
export interface JewishDatePickerProps {
    id: string | undefined;
    isHebrewDate: boolean;
    value: BasicJewishDate;
    onSelectDateClick: (value: any) => void;
}
export declare const CommonJewishDatePicker: ({ id, isHebrewDate, value, onSelectDateClick }: JewishDatePickerProps) => JSX.Element;
export default CommonJewishDatePicker;
