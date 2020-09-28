import React, { useState } from 'react';
import { useDispatch } from '../../store';
import { convertTextToDate, toStringDatetime } from '../../utility';
import '../../style/DateSetForm.scss';
import { makeStyles } from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  doneButton: {
    alignItems: 'flex-end',
  },
}));

const DateSetForm = ({ text, time, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isTimeSet, toggleIsTimeSet] = useState(false);
  const [ariaExpanded, toggleAriaExpanded] = useState(false);
  const [timeText, setTimeText] = useState('');
  const [alermTimeText, setAlermTimeText] = useState('');

  const today = new Date().toISOString().substr(0, 10);
  const [dateText, setDateText] = useState(today);

  const setAlerm = () => {
    dispatch({ type: 'SET_ALERM', id: id, time: time });
    const diff = time.getTime() - new Date().getTime();
    if (diff > 0) {
        setTimeout( () => {
          alert(text);
          dispatch({ type: 'TOGGLE_DONE', id: id });
        }, diff);
    } else {
        dispatch({type: 'TOGGLE_DONE', id: id});
    }
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    //close dropdown
    toggleAriaExpanded(!ariaExpanded);
    if (timeText !== '') {
      toggleIsTimeSet(true);
      //convert timetext to datetime
      time = convertTextToDate(new Date(dateText), timeText);
      setAlermTimeText(toStringDatetime(time));
      setAlerm();
    } else {
      return;
    }
  };

  return (
    <div className="dateSetForm btn-group z-idnex20" role="group">
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
