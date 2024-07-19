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
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Typescript ', isDone: true},
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'Graph QL', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false}
        ],
    })

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl));
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t) })
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks;
                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
                }
                return (
                    <Todolist key={tl.id} todolistId={tl.id} title={tl.title} tasks={tasksForTodolist} date={'06.06.2024'} removeTask={removeTask}
                              changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeTaskStatus} filter={tl.filter}/>
                )
            })}
        </div>
    );
}
