import React, {ChangeEvent, useState} from 'react'
import TextField from '@mui/material/TextField';

type EditableSpan = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: EditableSpan) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
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
}