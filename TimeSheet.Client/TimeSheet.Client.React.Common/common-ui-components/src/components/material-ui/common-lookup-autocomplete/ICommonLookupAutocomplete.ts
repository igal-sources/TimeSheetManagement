export interface ICommonLookupAutocompleteProps {
  id: string;
  label?: string;
  optionId?: string;
  optionText?: string;
  className?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  options: any;
  defaultValue: any;
  lookupsLanguage: any;
  hasErrors?: boolean;
  helperText?: string;
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (event: any, value: any) => void;
}
