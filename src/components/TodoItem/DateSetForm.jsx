import React, { useState } from 'react';
import { convertTextToDate, toStringDatetime } from '../utility';
import '../../style/DateSetForm.scss';
import { makeStyles } from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  doneButton: {
    alignItems: 'flex-end',
  },
}));

const DateSetForm = (props) => {
  const classes = useStyles();
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
  };

  return (
    <div className="dateSetForm btn-group" role="group">
      {isTimeSet ? (
        <span id="alermText">{alermTimeText}</span>
      ) : (
        <AlarmIcon
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={ariaExpanded}
          data-offset="-200,0"
        />
      )}

      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <input
          id="date"
          type="date"
          className="dropdown-item"
          defaultValue={today}
          onChange={(e) => setDateText(e.target.value)}
        />
        <input
          id="time"
          type="time"
          className="dropdown-item"
          onChange={(e) => setTimeText(e.target.value)}
        />
        <Button
          color="primary"
          name="Save"
          className={classes.doneButton}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

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
