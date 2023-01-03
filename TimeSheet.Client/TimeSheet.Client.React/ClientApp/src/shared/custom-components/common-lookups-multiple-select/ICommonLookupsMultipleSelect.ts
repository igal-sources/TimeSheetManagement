export interface ICommonLookupsMultipleSelectProps {
  id: string;
  className?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus: boolean;
  isMultiple: boolean;
  label?: string;
  value: any;
  enumOptions: any;
  lookupsLanguage?: string;
  onChange: (event: any, newValue: any) => void;
  onBlur: (event: any, newValue: any) => void;
  onFocus: (event: any, newValue: any) => void;
  hasErrors?: boolean;
}
