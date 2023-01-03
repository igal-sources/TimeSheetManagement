import { JSONSchema7 } from 'json-schema'

export interface ICommonNumberFieldProps {
  id: string
  className?: string
  placeholder?: string
  helperText?: string
  autoFocus: boolean
  required: boolean
  disabled: boolean
  fullWidth: boolean
  label?: string
  defaultValue: any
  onBlur: (id: any, value: any) => void
  onFocus: (id: any, value: any) => void
  onChange: (event: any) => void
  schema?: JSONSchema7
  maxLength?: number
  hasErrors: boolean
}
