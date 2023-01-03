export interface ICommonAutocompleteCountriesProps {
  id: string;
  label?: string;
  className?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  defaultValue: any;
  lookupsLanguage: any;
  hasErrors?: boolean;
  helperText?: string;
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (event: any, value: any) => void;
}
