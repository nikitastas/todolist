import './App.css';
import {Todolist} from './Todolist';

type Task = {
    id: number
    title: string
    isDone: boolean
}

export function App() {
    let tasks1: Array<Task> = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript ', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]

    const removeTask = (taskId: number) => {
        tasks1 = tasks1.filter(task => task.id !== taskId);
    }

    return (
        <div className="App">
            <Todolist title = {"What to learn"} tasks={tasks1} date={'06.06.2024'} removeTask={removeTask}/>
        </div>
    );
}
