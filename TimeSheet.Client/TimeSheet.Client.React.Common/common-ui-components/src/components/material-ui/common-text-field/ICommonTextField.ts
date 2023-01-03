import { JSONSchema7 } from 'json-schema'
export interface ICommonTextFieldProps {
  id: string
  className?: string
  classes?: any
  placeholder?: string
  helperText?: string
  required: boolean
  autoFocus: boolean
  disabled: boolean
  readOnly: boolean
  fullWidth: boolean
  inputType?: string
  label?: string
  defaultValue: any
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (event: any) => void
  schema?: JSONSchema7
  maxLength?: number
  hasErrors: boolean
}
