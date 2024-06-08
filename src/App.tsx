import './App.css';
import {Todolist} from './Todolist';
import {useState} from 'react';

type Task = {
    id: number
    title: string
    isDone: boolean
}

export function App() {
    const [tasks, setTasks] = useState<Array<Task>>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript ', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ])

    const [filter, setFilter] = useState('all');

    const removeTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title = {"What to learn"} tasks={tasks} date={'06.06.2024'} removeTask={removeTask}/>
        </div>
    );
}
