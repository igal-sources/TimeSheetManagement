export interface ICommonLookupsSelectProps {
  id: string
  className?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  autoFocus: boolean
  label?: string
  defaultValue: any
  enumOptions: any
  lookupsLanguage?: string
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (event: any) => void
  hasErrors?: boolean
}
