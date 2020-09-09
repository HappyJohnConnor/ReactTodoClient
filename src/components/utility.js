export function displayAlert(todoItem) {
    alert(todoItem.text);
}

export function convertTextToDate(date, timetext) {
    date.setHours(timetext.substr(0, 2));
    date.setMinutes(timetext.substr(-2, 2));
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}