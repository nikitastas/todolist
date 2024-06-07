import {Button} from './Button';

type Props = {
    title: string
    tasks: Array<Task>
    date?: string
    removeTask: (taskId: number) => void
}

type Task = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, removeTask}: Props) => {
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
                                <button onClick={() => removeTask(task.id)}>x</button>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{date}</div>
        </div>
    )
}