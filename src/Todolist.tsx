import {Button} from './Button';
import {FilterValues} from './App';
import {useRef} from 'react';

type Props = {
    title: string
    tasks: Array<Task>
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    addTask: (title: string) => void
}

type Task = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter, addTask}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef} />
                <Button title={'+'} onClick={() => {
                    if (inputRef.current) {
                        addTask(inputRef.current.value)
                        inputRef.current.value = ''
                    }
                }} />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => removeTask(task.id)} />
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}