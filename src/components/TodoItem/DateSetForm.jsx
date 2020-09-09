import React, { useState } from "react";

const DateSetForm = props => {
    const todo = props.todo;
    const [timeText, setTimeText] = useState('');

    const today = new Date().toISOString().substr(0, 10);
    const [dateText, setDateText] = useState(today);
    const handleDatetimeClick = (e) => {
        e.preventDefault();
        return props.setTimeAlerm(todo.id, dateText, timeText);
    }

    return (
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
    )
}

export default DateSetForm;