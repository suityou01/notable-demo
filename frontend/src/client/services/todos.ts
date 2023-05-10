import urls from '../urls';
import axios, { AxiosResponse } from 'axios';
import { ToDoItemType } from '../../server/common/types';

const getTodos = async () : Promise<ToDoItemType[]> => {
    const todos = await axios.get<ToDoItemType[]>(urls.todos, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return todos.data;
}

const updateTodo = async (todo: ToDoItemType) : Promise<ToDoItemType> => {
    const response: AxiosResponse<ToDoItemType, any> = await axios.put<ToDoItemType>(urls.todo, {
        headers: {
            'Content-Type': 'application/json'
        },
        todo
    })
    const data = await response.data;
    return data;
}

export {
    getTodos,
    updateTodo
}