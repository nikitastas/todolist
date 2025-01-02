import type { Meta, StoryObj } from '@storybook/react'
import {action} from '@storybook/addon-actions'
import React from 'react'
import {Task, TaskProps} from '../fatures/todolists/ui/Todolists/Todolist/Tasks/Task/Task'
import {v1} from 'uuid';
import {Provider} from 'react-redux';
import {store} from '../app/store';

const TaskWithProvider = (args: TaskProps) => (
    <Provider store={store}>
      <Task {...args} />
    </Provider>
);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: TaskWithProvider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    /*addItem: {
      description: 'Clicked button inside form',
      action: 'clicked'
    },*/
  },
  args: {
    task: {id: 'qewwre2', title: 'JS', isDone: true},
    todolist: {id: v1(), title: 'Todolist Title', filter: 'all'}
  }
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} // satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
  args: {
    task: {id: 'qewwre2', title: 'CSS', isDone: false}
  }
}
