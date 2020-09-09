import React, { useState } from "react";

const Item = props => {
    const todo = props.item;
    const [inputText, setInputtext] = useState('');
    const [editing, setEditMode] = useState(false);
    const [timeText, setTimeText] = useState('');

    const today = new Date().toISOString().substr(0, 10);
    const [dateText, setDateText] = useState(today);
    
    const remove = () => props.remove(todo['id']);
    const handleDoneClick = () => {
        //edit todo item
        props.edit(todo.id, inputText);
        //change to edit false
        setEditMode(!editing);
    };

    const handleDatetimeClick = (e) => {
        e.preventDefault();
        return props.setTimeAlerm(todo.id, dateText, timeText);
    }

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

            <form
                onSubmit={handleDatetimeClick}
                onKeyPress={e => {
                    if (e.key === 'Enter') handleDatetimeClick(e);
                    }
                }>
                <input id="date" type="date"
                    defaultValue={today}
                    onChange={e => setDateText(e.target.value)}
                />
                <input id="time" type="time"
                    onChange={e => setTimeText(e.target.value)}
                />
                <input type="submit" value="Save" />
            </form>
        </li>
    )
}

export default Item;