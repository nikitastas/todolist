import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
            },
        })
        return promise
    },
    updateTodolist(payload: {id: string, title: string}) {
        const {id, title} = payload
        const promise = axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                    'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                },
            })
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<CreateTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                    'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                },
            }
        )
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
            },
        })
        return promise
    }
}