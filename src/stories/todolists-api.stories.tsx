import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { _todolistsApi } from 'fatures/todolists/api/todolistsApi'

export default {
  title: 'API',
}

const config = { withCredentials: true }

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', config)
    promise.then((res) => {
      setState(res.data)
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    /*axios
      .post("https://social-network.samuraijs.com/api/1.1/todo-lists", { title: "REACT" }, config)
      .then((res) => setState(res.data))*/
    _todolistsApi.createTodolist('REACT').then((res) => setState(res.data))
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = '615a27fc-11f8-443b-9322-a2ad39eb3f4c'
    /*axios
      .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, config)
      .then((res) => setState(res.data))*/
    _todolistsApi.deleteTodolist(todoId).then((res) => setState(res.data))
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = '18b50c96-2e41-4807-9748-65354e0ee562'
    _todolistsApi.updateTodolist({ id: todoId, title: 'REDUX' }).then((res) => setState(res.data))
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
