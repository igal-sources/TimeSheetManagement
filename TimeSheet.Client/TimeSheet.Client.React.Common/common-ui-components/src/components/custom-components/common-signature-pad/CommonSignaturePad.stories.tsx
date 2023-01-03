import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonSignaturePad from './CommonSignaturePad'
import SignaturePadProps from './CommonSignaturePad'
import { ICommonSignaturePadProps } from '../../../global/interfaces'

export default {
  title: 'Components/Signature Pad',
  component: CommonSignaturePad,
  argTypes: {
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    signatureURL: { table: { disable: true } },
    showSignaturePad: {
      name: 'Show Signature Pad',
      control: { type: 'boolean' },
      defaultValue: false
    },
    signaturePopupTitle: {
      name: 'Popup Title',
      control: 'text',
      defaultValue: 'Please sign...',
      description: 'description'
    },
    signatureButtonSave: {
      name: 'Save Button Title',
      control: 'text',
      defaultValue: 'Save',
      description: 'description'
    },
    signatureButtonClear: {
      name: 'Clear Button Title',
      control: 'text',
      defaultValue: 'Clear',
      description: 'description'
    },
    signatureButtonClose: {
      name: 'Close Button Title',
      control: 'text',
      defaultValue: 'Close',
      description: 'description'
    },
    isRTL: {
      name: 'Is Right To Left',
      control: { type: 'boolean' },
      defaultValue: true
    }
  }
} as Meta

const Template: Story<typeof SignaturePadProps> = (args: any) => (
  <CommonSignaturePad
    id='undefined'
    name='undefined'
    signatureURL='undefined'
    signaturePopupTitle=''
    signatureButtonSave=''
    signatureButtonClear=''
    signatureButtonClose=''
    isRTL={false}
    showSignaturePad={false}
    closeSignaturePad={() => void {}}
    confirmSignaturePad={() => void {}}
    {...args}
  />
)

export const SignaturePad = Template.bind({})
