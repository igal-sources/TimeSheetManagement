import React from 'react'
import { ICommonNumberFieldProps } from './ICommonNumberField'
import { TextField } from '@mui/material'
import { useStyles } from "../CommonStyle";

export const CommonNumberField = ({
  id,
  className = '',
  placeholder,
  helperText,
  autoFocus,
  required,
  disabled,
  fullWidth = false,
  label,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  maxLength,
  hasErrors
}: ICommonNumberFieldProps) => {
  const classes = useStyles()
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  if (required) {
    className=`${className} ${classes.requiredStyle}`
  }

  return (
    <TextField
      id={id}
      className={className}
      placeholder={placeholder}
      label={label}
      autoFocus={autoFocus}
      required={required}
      disabled={disabled}
      variant='outlined'
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
        classes: {
          input: classes.resize,
        },
      }}
      onInput={(e: any) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
      }}
    />
  )
}

CommonNumberField.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: false,
  autoFocus: false,
  schema: {},
  onBlur: () => void 0,
  onFocus: () => void 0,
  hasErrors: false,
  helperText: ''
}

export default CommonNumberField
