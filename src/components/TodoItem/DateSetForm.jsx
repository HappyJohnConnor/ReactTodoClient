import React, { useState } from "react";
import { convertTextToDate, toStringDatetime } from '../utility';
import "../../css/DateSetForm.scss";

const DateSetForm = props => {
    const todo = props.todo;
    const [isTimeSet, toggleIsTimeSet] = useState(false);
    const [ariaExpanded, toggleAriaExpanded] = useState(false);
    const [timeText, setTimeText] = useState('');
    const [alermTimeText, setAlermTimeText] = useState('');

    const today = new Date().toISOString().substr(0, 10);
    const [dateText, setDateText] = useState(today);

    const handleSaveClick = (e) => {
        e.preventDefault();
        //close dropdown
        toggleAriaExpanded(!ariaExpanded);
        if (timeText !== '') {
            toggleIsTimeSet(true);
            //convert timetext to datetime
            let alermTime = new Date(dateText);
            alermTime = convertTextToDate(alermTime, timeText);
            setAlermTimeText(toStringDatetime(alermTime));
            return props.setTodoAlerm(todo.id, alermTime);
        } else {
            return;
        }
    }

    return (
        <div className="dateSetForm btn-group" role="group">
            {isTimeSet ?
                <span id="alermText">{alermTimeText}</span>
                :
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded={ariaExpanded} data-offset="-100,0">
                    Set alert
                </button>
            }
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <input id="date" type="date"
                    className="dropdown-item"
                    defaultValue={today}
                    onChange={e => setDateText(e.target.value)}
                />
                <input id="time" type="time"
                    className="dropdown-item"
                    onChange={e => setTimeText(e.target.value)}
                />
                <span name="Save"
                    onClick={handleSaveClick}>Save</span>
            </div>
        </div>
    )
}

export default DateSetForm;

/*
function hookComponent(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            var dropdownMenu = document.getElementsByClassName('dropdown-menu');
            dropdownMenu[0].addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
        render() {
            return <WrappedComponent />
        }
    }
}

const EnhancedDateSetForm = hookComponent(DateSetForm);
export default EnhancedDateSetForm;*/