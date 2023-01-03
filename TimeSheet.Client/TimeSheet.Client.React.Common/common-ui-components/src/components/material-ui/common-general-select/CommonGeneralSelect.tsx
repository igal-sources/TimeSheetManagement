import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import { ICommonGeneralSelectProps } from '../../../global/interfaces'
import { useStyles } from "../CommonStyle";

export const CommonGeneralSelect = ({
  id,
  className,
  optionText,
  optionId,
  helperText,
  autoFocus,
  required,
  disabled,
  fullWidth,
  label,
  defaultValue,
  onBlur,
  onFocus,
  onChange,
  hasErrors,
  enumOptions,
}: ICommonGeneralSelectProps) => {
  const classes = useStyles()
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  if (required) {
    className=`${className} ${classes.requiredStyle}`
  }
  
  return (
    <TextField
      id={id}
      name={id}
      className={className}
      label={label}
      autoFocus={autoFocus}
      required={required}
      disabled={disabled}
      variant='outlined'
      select
      defaultValue={defaultValue || defaultValue === 0 ? defaultValue : ''}
      fullWidth={fullWidth}
      error={hasErrors}
      onBlur={_onBlur}
      onFocus={_onFocus}
      onChange={onChange}
      size='small'
      helperText={helperText}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    >
      {(enumOptions as any).map((enumObj: any, i: number) => {
        return (
          <MenuItem key={i} value={enumObj[`${optionId}`]} disabled={disabled}>
            {enumObj[`${optionText}`]}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

CommonGeneralSelect.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: true,
  autoFocus: false,
  className: '',
  hasErrors: false,
  helperText: '',
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonGeneralSelect
