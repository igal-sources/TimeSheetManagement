export interface ICommonGeneralSelectProps {
  id: string
  className?: string
  helperText?: string
  optionText?: string
  optionId?: string
  autoFocus: boolean
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  withLabelOnTop?: boolean
  label?: string
  defaultValue: any
  enumOptions: any
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (event: any) => void
  hasErrors?: boolean
}
