import React from 'react'
import { TextField, Autocomplete } from '@mui/material'
import { ICommonLookupAutocompleteProps } from './ICommonLookupAutocomplete'
import { useStyles } from '../CommonStyle'

export const CommonLookupAutocomplete = ({
  id,
  defaultValue,
  className = '',
  options,
  fullWidth,
  required,
  disabled,
  label,
  onBlur,
  onFocus,
  onChange,
  lookupsLanguage,
  hasErrors,
  helperText
}: ICommonLookupAutocompleteProps) => {
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
      value={defaultValue}
      size='small'
      fullWidth={fullWidth}
      disabled={disabled}
      className={className}
      onBlur={_onBlur}
      onFocus={_onFocus}
      onChange={onChange}
      options={options}
      autoHighlight
      isOptionEqualToValue={(option: { id: any }, value: { id: any }) =>
        option.id === value.id
      }
      getOptionLabel={(option: any) =>
        option[`${lookupsLanguage}`] ? option[`${lookupsLanguage}`] : ''
      }
      renderInput={(params: any) => (
        <TextField
          id={id}
          {...params}
          required={required}
          label={label}
          variant='outlined'
          inputProps={{
            ...params.inputProps
          }}
          InputProps={{
            classes: {
              input: classes.resize
            }
          }}
          error={hasErrors}
          helperText={helperText}
        />
      )}
    />
  )
}

CommonLookupAutocomplete.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: true,
  className: '',
  hasErrors: false,
  helperText: '',
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonLookupAutocomplete
