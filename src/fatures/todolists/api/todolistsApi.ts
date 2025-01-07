import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";

export const todolistsApi = {
    getTodolists() {
        return axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
            },
        })
    },
    updateTodolist(payload: {id: string, title: string}) {
        const {id, title} = payload
        return axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                    'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                },
            })
    },
    createTodolist(title: string) {
        return axios.post<CreateTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                    'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                },
            }
        )
    },
    deleteTodolist(id: string) {
        return axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
            },
        })
    }
}