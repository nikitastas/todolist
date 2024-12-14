import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddBoxIcon from'@mui/icons-material/AddBox'

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(({addItem}: Props) => {
    console.log('AddItemForm')

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