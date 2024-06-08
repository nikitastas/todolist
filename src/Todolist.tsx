import {Button} from './Button';
import {FilterValues} from './App';

type Props = {
    title: string
    tasks: Array<Task>
    date?: string
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValues) => void
}

type Task = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
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
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}