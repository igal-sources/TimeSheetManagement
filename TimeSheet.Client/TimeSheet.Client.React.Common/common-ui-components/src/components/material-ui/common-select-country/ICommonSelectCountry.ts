export interface ICommonSelectCountryProps {
  id?: string
  name?: string
  label?: string
  lookupsLanguage?: string
  value?: any
  className?: string
  autoFocus: boolean
  fullWidth: boolean
  required: boolean
  disabled: boolean
  readOnly: boolean
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (value: any) => void
}
