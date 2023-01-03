export interface ICommonAutocompleteCallingAPIProps {
  id: string
  label?: string
  className?: string
  required?: boolean
  options: any
  freeSolo?: boolean
  disabled?: boolean
  defaultValue: any
  hasErrors?: boolean
  helperText?: string
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  getOptionLabel: (option: any) => string
  onChange: (event: any, value: any) => void
  isOptionEqualToValue?: (option: any, value: any) => boolean
  onInputChange: (event: any, value: string, reason: any) => void
}
