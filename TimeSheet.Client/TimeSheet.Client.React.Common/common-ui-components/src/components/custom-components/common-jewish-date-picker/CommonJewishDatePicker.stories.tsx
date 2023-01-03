import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonJewishDatePicker from './CommonJewishDatePicker'
import JewishDatePickerProps from './CommonJewishDatePicker'

export default {
  title: 'Components/Jewish DatePicker',
  component: CommonJewishDatePicker,
  argTypes: {
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    isHebrewDate: {
      name: 'Is Hebrew Date',
      control: { type: 'boolean' },
      defaultValue: true
    },
    value: {
      name: 'value',
      control: { type: 'object' },
      defaultValue: {
        year: 5782,
        month: 2,
        day: 7,
        monthName: 'Heshvan'
      }
    }
  }
} as Meta

const Template: Story<typeof JewishDatePickerProps> = (args) => (
  <CommonJewishDatePicker
    name='undefined'
    isHebrewDate={true}
    value={{
      day: 0,
      year: 0,
      monthName: ''
    }}
    onSelectDateClick={function (_value: any): void {}}
    {...args}
  />
)

export const JewishDatePicker = Template.bind({})
