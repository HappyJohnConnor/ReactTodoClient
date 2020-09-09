import React, { Component, useState } from 'react';
import Item from './Item';

let style = {
    maxwidth: '700px',
};

let btn = {
    cursor: 'pointer'
};

const List = (props) => {
    return (
            <ul>
            {props.todos.map((todo, index) => {
                return (
                    <Item
                        key={index}
                        item={todo}
                        remove={props.removeTodo}
                        edit={props.editTodo}
                        setTimeAlerm={props.setTimeAlerm}
                    />
                )
            })}
        </ul >
        
    );
}

export default List;