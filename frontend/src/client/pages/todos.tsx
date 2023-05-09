import React, { useEffect, useCallback, useState } from 'react';
import { NextPage } from 'next';
import ToDoItem from '../components/todoItem';
import { getTodos, updateTodo } from '../services/todos';
import { ToDoItem as ToDoItemType } from '../../common/types';

const Home: NextPage = () => {
    const onCompleted = (evt) => {
        console.log(onCompleted);
    }
    const [todos, setTodos] = useState<ToDoItemType[]>();
    const fetchTodos = useCallback(async () => {
        let response:ToDoItemType[] = await getTodos();
        setTodos(response);
    },[]);

    useEffect(()=> {
        fetchTodos()
    },[fetchTodos]);

 return (
    <> 
        { todos.map((todo)=><ToDoItem id={todo.id} todo={todo.todo} completed={todo.completed} onCompleted={onCompleted}></ToDoItem>) }
    </>
    )
}

export default Home
