import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios';
import {
    Todolist,
} from "../fatures/todolists/api/todolistsApi.types";
import {
    DomainTask,
    GetTasksResponse, UpdateTaskModel
} from "../fatures/todolists/api/tasksApi.types";
import {todolistsApi} from "../fatures/todolists/api/todolistsApi";
import {tasksApi} from "../fatures/todolists/api/tasksApi";


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists().then(res => {
                const todolists = res.data
                setTodolists(res.data)
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                            headers: {
                                Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                                'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                            },
                        })
                        .then(res => {
                            setTasks({...tasks, [tl.id]: res.data.items})
                        })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.deleteTodolist(id).then(res => {
            setTodolists(todolists.filter(tl => tl.id !== id))
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({id, title}).then(res => {
            setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl))
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksApi.createTask({title, todolistId})
            .then(res => {
                const newTask = res.data.data.item
                let newTasks = {...tasks}
                if (!newTasks[todolistId]) {
                    newTasks[todolistId] = []; // Инициализируем как пустой массив
                }
                setTasks({ ...newTasks, [todolistId]: [newTask, ...newTasks[todolistId]] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.removeTask({taskId, todolistId}).then(res => {
            setTasks({...tasks, [todolistId]: tasks[todolistId].filter(tl => tl.id !== taskId)})
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        tasksApi.changeTaskStatus({taskId: task.id, todolistId: task.todoListId, model}).then(res => {
            const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
            setTasks({...tasks, [task.todoListId]: newTasks})
        })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: UpdateTaskModel = {
            title: title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        tasksApi.changeTaskTitle({taskId: task.id, todolistId: task.todoListId, model})
            .then(res => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map(tl => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2 ? true : false}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}