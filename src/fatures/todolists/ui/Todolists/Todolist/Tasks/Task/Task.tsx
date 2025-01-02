import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import {TodolistType} from '../../../../../model/todolists-reducer';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from '../../../../../model/tasks-reducer';
import {ChangeEvent, memo, useCallback} from 'react';
import {getListItemSx} from './Task.tyles';
import {useAppDispatch} from '../../../../../../../common/hooks/useAppDispatch';

export type TaskProps = {
    task: TaskType
    todolist: TodolistType
}

export const Task = memo(({task, todolist}: TaskProps) => {
    console.log('Task')
    const dispatch = useAppDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
    }, [dispatch, task.id, todolist.id])

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }))
    }, [dispatch, task.id, todolist.id])

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC({ taskId: task.id, todolistId: todolist.id, title }))
    }, [dispatch, task.id, todolist.id])

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
})