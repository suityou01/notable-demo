import React,{ FC } from 'react';
import styles from './todoitem.module.css';
import { ToDoItemType } from '../../server/common/types';

interface ToDoItemProp extends ToDoItemType {
    onCompleted: Function
}

const ToDoItem: FC<ToDoItemProp> = ( { id, todo, completed, onCompleted }: ToDoItemProp ) => {
    const onchecked = (evt) => {
        onCompleted(evt);
    }
    return (
    <div className={styles.todoItem}>
        <div className={styles.todoItemId}>ID:{id}</div>
        <div className={styles.todoItemContainer}>
            <div className={styles.todoItemText}>{todo}</div>
            <div className={styles.todoItemCompleted}><input type="checkbox" className={styles.checkbox} checked={completed} onChange={onchecked}/></div>
        </div>
    </div>
)};

export default ToDoItem;