import urls from '../urls';
import axios, { AxiosResponse } from 'axios';
import { ToDoItem } from '../../common/types';

const getTodos = async () : Promise<ToDoItem[]> => {
    const todos = await axios.get<ToDoItem[]>(urls.todos, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return todos.data;
}

const updateTodo = async (todo: ToDoItem) : Promise<ToDoItem> => {
    const response: AxiosResponse<ToDoItem, any> = await axios.put<ToDoItem>(urls.todo, {
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