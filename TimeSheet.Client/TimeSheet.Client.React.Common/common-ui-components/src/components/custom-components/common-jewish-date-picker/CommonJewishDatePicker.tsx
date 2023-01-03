import React, { useState, useEffect } from 'react'
import { ReactJewishDatePicker, BasicJewishDay } from 'react-jewish-datepicker'
import { ICommonJewishDatePickerProps } from '../../../global/interfaces'
import './common-jewish-datePicker.css'

export const CommonJewishDatePicker = ({
  name = '',
  isHebrewDate = true,
  value = {
    day: 0,
    year: 0,
    monthName: ''
  },
  onSelectDateClick
}: ICommonJewishDatePickerProps) => {
  const [basicJewishDay, setBasicJewishDay] = useState<BasicJewishDay>()

  useEffect(() => {
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicJewishDay])

  return (
    <div id={name} className='date-picker-container'>
      <ReactJewishDatePicker
        className='jewish-date-style'
        value={value}
        isHebrew={isHebrewDate}
        onClick={(day: BasicJewishDay) => {
          setBasicJewishDay(day)
          onSelectDateClick(JSON.stringify(day))
          console.log('selected date: ', JSON.stringify(day))
        }}
      />
    </div>
  )
}

export default CommonJewishDatePicker;