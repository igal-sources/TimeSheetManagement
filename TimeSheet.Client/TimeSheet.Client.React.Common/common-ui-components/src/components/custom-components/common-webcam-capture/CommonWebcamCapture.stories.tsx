import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonWebcamCapture from './CommonWebcamCapture'
import WebcamCaptureProps from './CommonWebcamCapture'

export default {
  title: 'Components/Webcam Capture',
  component: CommonWebcamCapture,
  argTypes: {
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    retakeImageTitle: {
      name: 'Retake Title',
      control: 'text',
      defaultValue: 'Retake',
      description: 'description'
    },
    captureImageTitle: {
      name: 'Capture Title',
      control: 'text',
      defaultValue: 'Capture',
      description: 'description'
    },
    imageWidth: {
      name: 'Width',
      defaultValue: 550,
      control: { type: 'range', min: 500, max: 1000, step: 50 }
    },
    isReadOnly: {
      name: 'Read Only',
      control: { type: 'boolean' },
      defaultValue: false
    },
  }
} as Meta

const Template: Story<typeof WebcamCaptureProps> = (args) => (
  <CommonWebcamCapture
    id='undefined'
    name='undefined'
    imageURL='undefined'
    retakeImageTitle=''
    captureImageTitle=''
    isReadOnly={false}
    imageWidth={550}
    confirm={() => void {}}
    {...args}
  />
)

export const WebcamCapture = Template.bind({})
