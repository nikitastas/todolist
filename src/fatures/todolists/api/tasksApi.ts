import axios from "axios";
import {CreateTaskResponse, DeleteTaskResponse, UpdateTaskModel, UpdateTaskResponse} from "./tasksApi.types";

export const tasksApi = {
    createTask(payload: { title: string, todolistId: string }) {
        const {title, todolistId} = payload
        return axios
            .post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                        'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                    },
                })

    },
    removeTask(payload: {taskId: string, todolistId: string}) {
        const {taskId, todolistId} = payload
        return axios
            .delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
                headers: {
                    Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                    'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                },
            })
    },
    changeTaskStatus(payload: {taskId: string, todolistId: string, model: UpdateTaskModel}) {
        const {taskId, todolistId, model} = payload

        return axios
            .put<UpdateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
                model,
                {
                    headers: {
                        Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                        'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                    },
                })
    },
    changeTaskTitle(payload: {taskId: string, todolistId: string, model: UpdateTaskModel}) {
        const {taskId, todolistId, model} = payload
        return axios
            .put<UpdateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
                model,
                {
                    headers: {
                        Authorization: 'Bearer a5eb66c8-2c92-47d8-ba61-3503673d2c5b',
                        'API-KEY': '926038eb-8d19-4217-8295-14f6fb32c43a',
                    },
                })
    }
}