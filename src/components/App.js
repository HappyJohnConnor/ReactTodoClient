import React, { useState } from 'react';
import Form from './Form';
import List from './List';
import {displayAlert, convertTextToDate} from './utility';
import "../css/App.scss";

const App = () => {
    const [todoList, setTodoList] = useState([]);

    //add todo
    const handleAdd = (e) => {
        //prevent to redirect
        e.preventDefault();
        const newTodo = (
            {
                id: new Date().getTime(),
                text: e.target.title.value,
                time: '',
                isDone: false
            });
        const newTodoList = [...todoList, newTodo];
        setTodoList(newTodoList);
        //empty the value of the input
        e.target.title.value = '';
    };
    
    const removeTodo = (id) => {
        const newTodoList = todoList.filter(item => {
            return item.id !== id;
        });
        setTodoList(newTodoList);
    };
    
    const editTodo = (id, text) => {
        const newTodoList = todoList.filter(item => {
            if (item.id === id) {
                item.text = text;
                return item;
            } else {
                return item;
            }
        })
        setTodoList(newTodoList);
    };

    const setTodoAlerm = (id, alermTime) => {
        const newTodoList = todoList.filter(item => {
            if (item.id === id) {
                item.time = alermTime.getTime();
                const diff = alermTime.getTime() - new Date().getTime();
                if (diff > 0) {
                    setTimeout(displayAlert, diff, item);
                } else {
                    item.isDone = true;
                }
                return item;
            } else {
                return item;
            };
        });
        setTodoList(newTodoList);
    };
    
    return (
            <div className="App">
                <h1>Todo App</h1>
                <Form handleAdd={handleAdd}></Form>
                <List
                    todos={todoList}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    setTodoAlerm={setTodoAlerm}
                />
            </div>
        
    );
}

export default App;
