import {Button} from './Button';
import {FilterValues} from './App';
import {ChangeEvent} from 'react';
import {AddItemFrom} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type Todolist = {
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

export const Todolist = ({todolistId, title, tasks, date, filter, removeTask, updateTask, updateTodolistTitle,
                             changeFilter, addTask, changeTaskStatus, removeTodolist}: Todolist) => {
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
                <h3><EditableSpan value={title} onChange={updateTodolistTitleHandler} /></h3>
                <Button title={'x'} onClick={removeTodolistHandler} />
            </div>
            <AddItemFrom addItem={addTaskCallback}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
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
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <Button title={'x'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler(todolistId, 'all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler(todolistId, 'active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler(todolistId, 'completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}