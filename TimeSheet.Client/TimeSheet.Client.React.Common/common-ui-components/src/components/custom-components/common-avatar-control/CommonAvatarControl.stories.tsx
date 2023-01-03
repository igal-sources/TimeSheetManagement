import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import CommonAvatarControl from './CommonAvatarControl'
import AvatarProps from './CommonAvatarControl'

export default {
  title: 'Components/Avatar Control',
  component: CommonAvatarControl,
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
    imageAltString: {
      name: 'alt string',
      control: 'text',
      defaultValue: 'Hello',
      description: 'demo description'
    },
    avatarWidth: {
      control: { type: 'range', min: 200, max: 1000, step: 50 }
    },
    avatarHeight: {
      control: { type: 'range', min: 200, max: 1000, step: 50 }
    },
    isReadOnly: {
      name: 'Read Only',
      control: { type: 'boolean' },
      defaultValue: false
    }
  }
} as Meta

const Template: Story<typeof AvatarProps> = (args) => (
  <CommonAvatarControl
    id='undefined'
    name='undefined'
    avatarWidth={250}
    avatarHeight={250}
    imageURL={undefined}
    imageAltString={'image Alt String'}
    isReadOnly={false}
    confirm={function (_value: any): void {}}
    {...args}
  />
)

export const AvatarControl = Template.bind({})
