import React, { useEffect, useCallback, useState } from 'react';
import { NextPage } from 'next';
import ToDoItem from '../components/todoItem';
import { getTodos } from '../services/todos';
import { ToDoItem as ToDoItemType } from '../../common/types';

const Home: NextPage = () => {
    const [todos, setTodos] = useState<ToDoItemType[]>();

    const fetchTodos = useCallback(async () => {
        let response:ToDoItemType[] = await getTodos();
        setTodos(response);
    },[]);

    useEffect(()=> {
        fetchTodos()
    },[fetchTodos]);

 return todos.map((todo)=><ToDoItem id={todo.id} todo={todo.todo} completed={todo.completed}></ToDoItem>)
    
}

export default Home
