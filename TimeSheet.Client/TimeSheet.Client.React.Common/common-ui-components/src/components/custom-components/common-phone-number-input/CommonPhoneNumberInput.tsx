import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en.json'
import he from 'react-phone-number-input/locale/he.json'
import ar from 'react-phone-number-input/locale/ar.json'
import ru from 'react-phone-number-input/locale/ru.json'
import CustomPhoneNumber from './CustomPhoneNumber'
import { ICommonPhoneNumberInputProps } from '../../../global/interfaces'
import './common-phone-number-input.css'

const phoneNumberLocalization: any = [
  { lang: 'he_IL', locale: he },
  { lang: 'en_US', locale: en },
  { lang: 'ar_AE', locale: ar },
  { lang: 'ru', locale: ru }
]

export const CommonPhoneNumberInput = ({
  id,
  label = '',
  className,
  placeholder,
  disabled,
  value,
  lookupsLanguage,
  onChange
}: ICommonPhoneNumberInputProps) => {
  const lookupLang = lookupsLanguage
    ? lookupsLanguage
    : localStorage.getItem('lookupsLanguage')

  const filtered = phoneNumberLocalization.filter((item: { lang: any }) => {
    return item.lang === lookupLang
  })
  return (
    <div dir='ltr'>
      <PhoneInput
        id={id}
        labels={filtered[0].locale}
        label={label}
        className={className}
        international
        initialValueFormat='national'
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        countryOptionsOrder={['IL', 'US', 'RU', '|']}
        inputComponent={CustomPhoneNumber}
        onChange={onChange}
      />
    </div>
  )
}

CommonPhoneNumberInput.defaultProps = {
  required: false,
  fullWidth: false,
  placeholder: 'Enter phone number'
}

export default CommonPhoneNumberInput
