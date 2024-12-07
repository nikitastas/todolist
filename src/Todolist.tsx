import {FilterValues} from './app/App';
import {ChangeEvent} from 'react';
import {AddItemFrom} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles';

type TodolistProps = {
    todolistId: string
    title: string
    tasks: Array<Task>
    date?: string
    filter: FilterValues
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, task: string) => void
    removeTodolist: (todolistId: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
}

type Task = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             todolistId, title, tasks, date, filter, removeTask, updateTask, updateTodolistTitle,
                             changeFilter, addTask, changeTaskStatus, removeTodolist
                         }: TodolistProps) => {
    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }

    const changeFilterTasksHandler = (todolistId: string, filter: FilterValues) => {
        changeFilter(todolistId, filter)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const updateTodolistTitleHandler = (title: string) => {
        updateTodolistTitle(todolistId, title)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan value={title} onChange={updateTodolistTitleHandler}/></h3>
                {/*<Button title={'x'} onClick={removeTodolistHandler} />*/}
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemFrom addItem={addTaskCallback}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }
                        return (
                            <ListItem
                                key={task.id}
                                sx={getListItemSx(task.isDone)}
                            >
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <Button title={'x'} onClick={removeTaskHandler}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}

            <Box sx={filterButtonsContainerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterTasksHandler(todolistId, 'all')}>
                    All
                    </Button>
                    <Button variant={filter === 'active' ? 'outlined' : 'text'}
                            color={'primary'}
                            onClick={() => changeFilterTasksHandler(todolistId, 'active')}>
                        Active
                    </Button>
                    <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                            color={'secondary'}
                            onClick={() => changeFilterTasksHandler(todolistId, 'completed')}>
                        Completed
                    </Button>
            </Box>
        </div>
)
}