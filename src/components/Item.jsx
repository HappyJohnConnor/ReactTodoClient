import React, { useState } from "react";

const Item = props => {
    const todo = props.item;
    const [inputText, setInputtext] = useState('');
    const [editing, setEditMode] = useState(false);

    const remove = () => props.remove(todo['id']);
    const handleDoneClick = () => {
        //edit todo item
        props.edit(todo.id, inputText);
        //change to edit false
        setEditMode(!editing);
    };

    return (
        <li>
            {editing ?
                //Todo title Box
                <input
                    id="titleBox"
                    type="text"
                    defaultValue={todo.text}
                    onChange={e => setInputtext(e.target.value)} />
                :
                <span>{todo.text}</span>
            }

            <span
                onClick={remove}>Delete
            </span>

            {editing ?
                <span
                    //onClick={() => props.editTodo(props.index, document.getElementById('titleBox').value)}>Done
                    onClick={handleDoneClick}>Done
                </span> :
                <button
                    onClick={() => setEditMode(!editing)}>
                    Edit
                </button>
            }
        </li>
    )
}

export default Item;