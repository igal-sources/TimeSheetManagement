import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonMonacoEditorProps from './CommonMonacoEditor'
import CommonMonacoEditor from './CommonMonacoEditor'

export default {
  title: 'Components/MonacoEditor',
  component: CommonMonacoEditor,
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
    title: {
      name: 'title',
      control: 'string',
      defaultValue: 'Monaco Editor',
      description: 'MonacoEditor description'
    },
    defaultLanguage: {
      name: 'title',
      control: 'string',
      defaultValue: 'JSON',
      description: 'defaultLanguage description'
    },
    isReadOnly: {
      name: 'Read Only',
      control: { type: 'boolean' },
      defaultValue: false
    }
  }
} as Meta

const Template: Story<typeof CommonMonacoEditorProps> = (args) => (
  <CommonMonacoEditor
    onJsonChange={undefined as any}
    title='undefined'
    isReadOnly={false}
    {...args}
  />
)

export const MonacoEditorControl = Template.bind({})
