import {Button} from './Button';
import {FilterValues} from './App';
import {ChangeEvent} from 'react';
import {AddItemFrom} from './AddItemForm';

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
    removeTodolist: (todolistId: string) => void
}

type Task = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({todolistId, title, tasks, date, filter, removeTask,
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

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
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
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
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