import React from 'react'
import { Box, TextField, MenuItem } from '@mui/material'
import { countries } from 'common-localization'
import { useStyles } from "../CommonStyle";
import { ICommonSelectCountryProps } from './ICommonSelectCountry'

export const CommonSelectCountry = ({
  id,
  name,
  label,
  value,
  autoFocus,
  className,
  fullWidth,
  required,
  disabled,
  readOnly,
  onChange,
  onBlur,
  onFocus,
  lookupsLanguage
}: ICommonSelectCountryProps) => {
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
      name={name}
      label={label}
      autoFocus={autoFocus}
      className={className}
      select
      value={value ? value : ''}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled || readOnly}
      onBlur={_onBlur}
      onFocus={_onFocus}
      onChange={onChange}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
      size='small'      
    >
      {countries.map((option: any) => (
        <MenuItem key={option.id} value={option.id} disabled={disabled}>
          <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
            <img
              width='20'
              src={require(`./assets/images/flags-svg/${option.ISO3.toLowerCase()}.svg`)}
              alt=''
            />
            {option[`${lookupLang}`]}
          </Box>
        </MenuItem>
      ))}
    </TextField>
  )
}

CommonSelectCountry.defaultProps = {
  required: false,
  disabled: false,
  readOnly: false,
  fullWidth: true,
  autoFocus: false,
  className: '',
  hasErrors: false,
  helperText: '',
  onBlur: () => void 0,
  onFocus: () => void 0
}

export default CommonSelectCountry
