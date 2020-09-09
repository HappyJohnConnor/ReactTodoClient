import React, { useState } from "react";

const Item = props => {
    const todo = props.item;
    const [inputText, setInputtext] = useState('');
    const [editing, setEditMode] = useState(false);
    const [timeText, setTimeText] = useState('');

    const remove = () => props.remove(todo['id']);
    const handleDoneClick = () => {
        //edit todo item
        props.edit(todo.id, inputText);
        //change to edit false
        setEditMode(!editing);
    };
    const handleTimeClick = (e) => {
        e.preventDefault();
        const timeTextPatter = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timeText.match(timeTextPatter)) {
            return;
        } else {
            return props.setTimeAlerm(todo.id, timeText);
        }
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
            <span>
                <input id="time" type="time"
                    onChange={e => setTimeText(e.target.value)}
                    onKeyPress={e => {
                        if (e.key == 'Enter') handleTimeClick(e);
                        }
                    }
                />
            </span>
            
        </li>
        /*
        <div className="alertDropdown">
        <img src="asset/icon/clock.svg" width="20" height="20" />
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
        </div>
        </div>*/
    )
}

export default Item;