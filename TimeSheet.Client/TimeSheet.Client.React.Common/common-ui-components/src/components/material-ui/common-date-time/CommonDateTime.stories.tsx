import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonDateTime from './CommonDateTime'
import CommonDateTimeProps from './CommonDateTime'

export default {
  title: 'Components/Material-UI',
  component: CommonDateTime,
  argTypes: {
    id: { table: { disable: true } },
    schema: { table: { disable: true } },
    inputType: { table: { disable: true } },
    defaultValue: {
      name: 'defaultValue',
      control: 'date',
      defaultValue: new Date(),
      description: 'defaultValue description'
    },
    placeholder: {
      name: 'placeholder',
      control: 'text',
      defaultValue: '',
      description: 'placeholder description'
    },
    label: {
      name: 'label',
      control: 'text',
      defaultValue: 'Date Picker',
      description: 'label description'
    },
    helperText: {
      name: 'helperText',
      control: 'text',
      defaultValue: '',
      description: 'helperText description'
    },
    required: {
      name: 'required',
      control: { type: 'boolean' },
      defaultValue: false
    },
    readonly: {
      name: 'readonly',
      control: { type: 'boolean' },
      defaultValue: false
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      defaultValue: false
    },
    fullWidth: {
      name: 'fullWidth',
      control: { type: 'boolean' },
      defaultValue: false
    },
    hasErrors: {
      name: 'hasErrors',
      control: { type: 'boolean' },
      defaultValue: false
    }
  }
} as Meta

const Template: Story<typeof CommonDateTimeProps> = (args: any) => (
  <CommonDateTime {...args} />
)

export const DateTimeControl = Template.bind({})
