import './App.css';
import {v1} from 'uuid'
import {Todolist} from './Todolist';
import {useReducer, useState} from 'react';
import {AddItemFrom} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from './MenuButton';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './model/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './model/tasks-reducer';

type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Tasks = {
    [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed';

type ThemeMode = 'dark' | 'light'


export function AppWithRedux() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(addTaskAC({title, todolistId}))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC({taskId, todolistId}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC({taskId, isDone: taskStatus, todolistId}))
    }

    const updateTask = (taskId: string, todolistId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({taskId, todolistId, newTitle: title}))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemFrom addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
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
                            <Grid>
                                <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist key={tl.id} todolistId={tl.id} title={tl.title} tasks={tasksForTodolist}
                                              date={'06.06.2024'} filter={tl.filter} removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask} changeTaskStatus={changeTaskStatus}
                                              removeTodolist={removeTodolist}
                                              updateTask={updateTask} updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
