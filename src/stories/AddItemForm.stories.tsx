import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm, Props} from '../common/components/AddItemForm/AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: 'Clicked button inside form',
      action: 'clicked'
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} // satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {}

const ErrorAddItemForm = memo(({addItem}: Props) => {

  const [itemTitle, setItemTitle] = useState('')
  const [error, setError] = useState<string | null>('Title is required')

  const addTaskHandler = () => {
    if (itemTitle.trim() !== '') {
      addItem(itemTitle.trim())
      setItemTitle('')
    } else {
      setError('Title is required')
    }
  }
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }
  const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null)
    if (e.key === 'Enter') addTaskHandler()
  }

  return (
      <div>
          {/*<input className={error ? 'error' : ''}
                   value={itemTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyUp={addTaskOnKeyUpHandler}
            />*/}
      <TextField
  label='Enter a title'
  variant={'outlined'}
  className={error ? 'error' : ''}
  value={itemTitle}
  size={'small'}
  error={!!error}
  helperText={error}
  onChange={changeTaskTitleHandler}
  onKeyUp={addTaskOnKeyUpHandler}
  />
  <IconButton onClick={addTaskHandler} color={'primary'}>
      <AddBoxIcon />
      </IconButton>
  {/*{error && <div className={'error-message'}>{error}</div>}*/}
  </div>
)
})

export const ErrorAddItemFormStory = () => <ErrorAddItemForm addItem={action('Clicked button inside from')} />