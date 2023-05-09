import React, { useEffect, useCallback, useState } from 'react';
import { NextPage } from 'next';
import ToDoItem from '../components/todoItem';
import { getTodos, updateTodo } from '../services/todos';
import { ToDoItemType } from '../../server/common/types';

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
        { todos && todos.map((todo)=><ToDoItem key={todo.id} id={todo.id} todo={todo.todo} completed={todo.completed} onCompleted={onCompleted}></ToDoItem>) }
    </>
    )
}

export default Home
