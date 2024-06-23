import {Button} from './Button';
import {FilterValuesType} from './App';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    title: string
    tasks: Array<Task>
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

type Task = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter, addTask}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('all')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}