import React from 'react'
import { ICommonLookupsSelectProps } from './ICommonLookupsSelect'
import { TextField, MenuItem } from '@mui/material'
import { useStyles } from "../CommonStyle";

export const CommonLookupsSelect = ({
  id,
  className,
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
  hasErrors,
  enumOptions,
  lookupsLanguage
}: ICommonLookupsSelectProps) => {
  const classes = useStyles()
  const lookupLang = lookupsLanguage ? lookupsLanguage : 'he_IL'
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
          <MenuItem key={i} value={enumObj.id} disabled={disabled}>
            {enumObj[`${lookupLang}`]}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

CommonLookupsSelect.defaultProps = {
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

export default CommonLookupsSelect
