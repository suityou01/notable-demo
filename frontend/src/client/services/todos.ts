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

export {
    getTodos
}