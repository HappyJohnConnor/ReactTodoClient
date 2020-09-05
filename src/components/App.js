import React, { useState } from 'react';
import Form from './Form';
import List from './List';


const App = () => {
    const [todoList, setTodoList] = useState([]);

    //add todo
    const handleAdd = (e) => {
        //prevent to redirect
        e.preventDefault();
        const newTodo = (
            {
                id: new Date().getTime(),
                text: e.target.title.value
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
    
    return (
            <div className="App">
            <h1>Todo App</h1>
            <Form handleAdd={handleAdd}></Form>
            <List
                todos={todoList}
                removeTodo={removeTodo}
                editTodo={editTodo}
            />
            </div>
        
    );
}

export default App;
