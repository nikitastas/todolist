import './App.css';
import { v1 } from 'uuid'
import {Todolist} from './Todolist';
import {useState} from 'react';

type Task = {
    id: string
    title: string
    isDone: boolean
}

type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed';

export function App() {
    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

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

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        setTasks(filteredTasks);
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl));
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(m => m.id === taskId ? {...m, isDone: taskStatus} : m)
        setTasks(newState)
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks;
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone);
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => task.isDone);
                }
                return (
                    <Todolist key={tl.id} todolistId={tl.id} title={tl.title} tasks={tasksForTodolist} date={'06.06.2024'} removeTask={removeTask}
                              changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeTaskStatus} filter={tl.filter}/>
                )
            })}
        </div>
    );
}
