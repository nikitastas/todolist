import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Button from '@mui/material/Button';

type AddItemForm = {
    addItem: (title: string) => void
}

export const AddItemFrom = ({addItem}: AddItemForm) => {
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
        setError(null)
        if (e.key === 'Enter') addTaskHandler()
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={itemTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyUp={addTaskOnKeyUpHandler}
            />
            <Button variant='contained' size='small' onClick={addTaskHandler}>
                +
            </Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}