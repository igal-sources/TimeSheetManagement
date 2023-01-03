import { ActionType } from "global/enums";

export interface ICommonPhoneNumberInputProps {
  id?: string;
  label?: string;
  className?: any;
  value?: any;
  placeholder?: string;
  helperText?: string;
  hasErrors?: boolean;
  required?: boolean;
  disabled: boolean;
  lookupsLanguage?: string;
  onChange: (event: any) => void;
}
