import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { genders } from 'common-localization'
import { Story } from '@storybook/react'
import CommonLookupsSelect from './CommonLookupsSelect'
import CommonLookupsSelectProps from './CommonLookupsSelect'

export default {
  title: 'Components/Material-UI',
  component: CommonLookupsSelect,
  argTypes: {
    id: { table: { disable: true } },
    schema: { table: { disable: true } },
    inputType: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    placeholder: {
      name: 'placeholder',
      control: 'text',
      defaultValue: '',
      description: 'placeholder description'
    },
    label: {
      name: 'label',
      control: 'text',
      defaultValue: 'Select Control',
      description: 'label description'
    },
    enumOptions: {
      name: 'enumOptions',
      control: 'object',
      defaultValue: genders,
      description: 'enumOptions description'
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
    fullWidth: {
      name: 'fullWidth',
      control: { type: 'boolean' },
      defaultValue: true
    },
    disabled: {
      name: 'disabled',
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

const Template: Story<typeof CommonLookupsSelectProps> = (args: any) => (
  <CommonLookupsSelect {...args} />
)

export const SelectControl = Template.bind({})
