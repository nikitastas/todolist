import React, {useCallback} from 'react';
import Grid from '@mui/material/Grid2';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import Container from '@mui/material/Container';
import {addTodolistAC} from '../fatures/todolists/model/todolists-reducer';
import {Todolists} from '../fatures/todolists/ui/Todolists/Todolists';
import {useAppDispatch} from '../common/hooks/useAppDispatch';

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}