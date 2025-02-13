import { Todolist } from './todolistsApi.types'
import { instance } from 'common/instance'
import { BaseResponse } from 'common/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as process from 'process'
import { DomainTodolist } from 'fatures/todolists/model/todolistsSlice'

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
      headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      },
    }),
  }),
})
export const { useGetTodolistsQuery } = todolistsApi
export const { useLazyGetTodolistsQuery } = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('todo-lists')
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
