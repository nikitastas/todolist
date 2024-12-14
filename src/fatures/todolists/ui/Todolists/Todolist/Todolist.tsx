import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm';
import {TodolistType} from '../../../model/todolists-reducer';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';
import {Tasks} from './Tasks/Tasks';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {addTaskAC} from '../../../model/tasks-reducer';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {memo, useCallback} from 'react';

type Props = {
    todolist: TodolistType
}

export const Todolist = memo(({ todolist }: Props) => {
    console.log(`Todolist ${todolist.title}`)
    const dispatch = useAppDispatch()

    const addTaskCallback = useCallback((title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }, [dispatch, todolist.id])

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist} />
        </div>
)
})