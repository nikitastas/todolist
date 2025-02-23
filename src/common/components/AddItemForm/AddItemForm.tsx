import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'

export type Props = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled }: Props) => {
  const [itemTitle, setItemTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

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
      <TextField
        label="Enter a title"
        variant={'outlined'}
        className={error ? 'error' : ''}
        value={itemTitle}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
        disabled={disabled}
      />
      <IconButton onClick={addTaskHandler} color={'primary'} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})
