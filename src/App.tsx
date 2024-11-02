import './App.css';
import {v1} from 'uuid'
import {Todolist} from './Todolist';
import {useState} from 'react';
import {AddItemFrom} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {MenuButton} from './MenuButton';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';

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

type TasksState = {
    [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed';

type ThemeMode = 'dark' | 'light'

export function App() {
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

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
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
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl));
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
        })
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId].map(t => taskId === t.id ? {...t, title} : t)]})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const myTasks = {...tasks}
        delete myTasks[todolistId]
        setTasks({...myTasks})
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists([...todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)])
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
