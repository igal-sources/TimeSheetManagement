import React from 'react'
import { TextField, Autocomplete, Box } from '@mui/material'
import { countries } from 'common-localization'
import { ICommonAutocompleteCountriesProps } from './ICommonAutocompleteCountries'
import { useStyles } from "../CommonStyle";

export const CommonAutocompleteCountries = ({
  id,
  defaultValue,
  className = '',
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
}: ICommonAutocompleteCountriesProps) => {
  const classes = useStyles();
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

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
      options={countries}
      autoHighlight
      isOptionEqualToValue={(option: { id: any }, value: { id: any }) =>
        option.id === value.id
      }
      getOptionLabel={(option: any) =>
        option[`${lookupsLanguage}`] ? option[`${lookupsLanguage}`] : ''
      }
      renderOption={(props, option: any) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading='lazy'
            width='20'
            src={require(`./assets/images/flags-svg/${option.ISO3.toLowerCase()}.svg`)}
            alt=''
          />
          {option[`${lookupsLanguage}`]}
        </Box>
      )}
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
          InputLabelProps={{ shrink: true }}
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          error={hasErrors}
          helperText={helperText}
        />
      )}
    />
  )
}

CommonAutocompleteCountries.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: true,
  className: '',
  hasErrors: false,
  helperText: '',
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonAutocompleteCountries
