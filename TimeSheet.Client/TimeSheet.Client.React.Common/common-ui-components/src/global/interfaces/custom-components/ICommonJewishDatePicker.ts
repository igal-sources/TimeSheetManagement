import { BasicJewishDate } from "react-jewish-datepicker"

export interface ICommonJewishDatePickerProps {
  name?: string
  isHebrewDate: boolean
  value: BasicJewishDate
  onSelectDateClick: (value: any) => void
}