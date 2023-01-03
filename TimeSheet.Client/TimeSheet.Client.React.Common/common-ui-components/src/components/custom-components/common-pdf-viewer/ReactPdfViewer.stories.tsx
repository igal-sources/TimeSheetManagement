import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonPdfViewer from './CommonPdfViewer'
import PdfViewerProps from './CommonPdfViewer'

export default {
  title: 'Components/Pdf Viewer',
  component: CommonPdfViewer,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    name: {
      table: {
        disable: true
      }
    },
    documentWidth: {
      name: 'Width',
      control: { type: 'range', min: 500, max: 1000, step: 50 }
    },
    documentHeight: {
      name: 'Height',
      control: { type: 'range', min: 500, max: 1000, step: 50 }
    },
    isReadOnly: {
      name: 'Read Only',
      control: { type: 'boolean' },
      defaultValue: false
    },
    isRTL: {
      name: 'Is Right To Left',
      control: { type: 'boolean' },
      defaultValue: true
    }
  }
} as Meta

const Template: Story<typeof PdfViewerProps> = (args) => (
  <CommonPdfViewer
    // id='undefined'
    name='undefined'
    document={undefined}
    documentWidth={500}
    documentHeight={500}
    isReadOnly={false}
    isRTL={true}
    serverURL={undefined}
    PdfFileErrorTitle={'Please select valid pdf file'}
    PdfFileInstruction={'No pdf file selected'}
    {...args}
  />
)

export const PdfViewer = Template.bind({})
