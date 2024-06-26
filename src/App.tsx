import './App.css';
import { v1 } from 'uuid'
import {Todolist} from './Todolist';
import {useState} from 'react';

type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export function App() {
    const [tasks, setTasks] = useState<Array<Task>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript ', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        setTasks(filteredTasks);
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist} date={'06.06.2024'} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}
