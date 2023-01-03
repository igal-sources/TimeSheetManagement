import React from 'react'
import { TextField } from '@mui/material'
import { useStyles } from '../CommonStyle'
import { ICommonTextFieldProps } from './ICommonTextField'

export const CommonTextField = ({
  id,
  className,
  placeholder,
  helperText,
  autoFocus,
  required,
  disabled,
  readOnly,
  fullWidth,
  inputType,
  label,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  maxLength,
  hasErrors
}: ICommonTextFieldProps) => {
  const classes = useStyles()
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({
    target: { value }
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value)

  if (required) {
    className=`${className} ${classes.requiredStyle}`
  }
  
  return (
    <TextField
      id={id}
      autoFocus={autoFocus}
      className={className}
      placeholder={placeholder}
      label={label}
      required={required}
      disabled={disabled}
      variant='outlined'
      type={inputType as string}
      fullWidth={fullWidth}
      defaultValue={defaultValue || defaultValue === 0 ? defaultValue : ''}
      error={hasErrors}
      onBlur={_onBlur}
      onFocus={_onFocus}
      onChange={onChange}
      size='small'
      helperText={helperText}
      inputProps={{ maxLength: maxLength }}
      InputProps={{
        readOnly: readOnly,
        classes: {
          input: classes.resize
        }
      }}
    />
  )
}

CommonTextField.defaultProps = {
  required: false,
  disabled: false,
  readOnly: false,
  fullWidth: false,
  autoFocus: false,
  className: '',
  hasErrors: false,
  helperText: '',
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonTextField
