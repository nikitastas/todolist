import React, { ChangeEvent, memo, useState } from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = memo(({ value, onChange, disabled }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    if (disabled) {
      return
    }
    setEditMode(true)
  }

  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (
    <>
      {editMode ? (
        <TextField
          variant={'outlined'}
          value={title}
          size={'small'}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  )
})
