import React from 'react'
import { TextField } from '@mui/material'
import { useStyles } from "../CommonStyle";
import { ICommonDateTimeProps } from './ICommonDateTime'

export const CommonDateTime = ({
  id,
  className,
  placeholder,
  helperText,
  autoFocus,
  required,
  disabled,
  fullWidth,
  label,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  maxLength,
  hasErrors
}: ICommonDateTimeProps) => {
  const classes = useStyles()
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);
  
  if (required) {
    className=`${className} ${classes.requiredStyle}`
  }
  return (
    <TextField
      id={id}
      type={'date'}
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
      InputLabelProps={{ shrink: true }}
      InputProps={{
        classes: {
          input: classes.resize,
        }
      }}
    />
  )
}

CommonDateTime.defaultProps = {
  required: false,
  fullWidth: true,
  autoFocus: false,
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonDateTime
