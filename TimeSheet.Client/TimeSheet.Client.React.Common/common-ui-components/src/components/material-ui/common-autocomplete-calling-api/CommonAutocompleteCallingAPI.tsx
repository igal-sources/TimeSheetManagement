import React from 'react'
import { TextField, Autocomplete } from '@mui/material'
import { ICommonAutocompleteCallingAPIProps } from './ICommonAutocompleteCallingAPI'
import { useStyles } from '../CommonStyle'

export const CommonAutocompleteCallingAPI = ({
  id,
  defaultValue,
  className = '',
  isOptionEqualToValue,
  options,
  required,
  disabled,
  freeSolo,
  label,
  onBlur,
  onFocus,
  onChange,
  onInputChange,
  getOptionLabel,
  hasErrors,
  helperText
}: ICommonAutocompleteCallingAPIProps) => {
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
    <Autocomplete
      id={id}
      freeSolo={freeSolo}
      defaultValue={defaultValue}
      size='small'
      disabled={disabled}
      onChange={onChange}
      isOptionEqualToValue={isOptionEqualToValue}
      options={options}
      onBlur={_onBlur}
      onFocus={_onFocus}
      onInputChange={onInputChange}
      getOptionLabel={getOptionLabel}
      className={className}
      classes={{ input: classes.resize }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          required={required}
          label={label}
          variant='outlined'
          error={hasErrors}
          helperText={helperText}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  )
}

CommonAutocompleteCallingAPI.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: true,
  hasErrors: false,
  helperText: '',
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonAutocompleteCallingAPI
