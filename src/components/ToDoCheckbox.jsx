import { useContext, useEffect, useState } from "react";
import DoneClickContext from "../context/DoneClickContext";

const ToDoCheckbox = (props) => {
    const [checked, setChecked] = useState(props.toDo.isDone);
    const { setDoneClick } = useContext(DoneClickContext);

    const setDoneOrUnDone = (checked) => {
        if(checked) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}/done`, requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status === 400) {
                    alert('To do could not be set as done');
                }
            })
            .then(setDoneClick(prev => !prev))
            .then(props.setIsDone(true))
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}/undone`, requestOptions)
            .then(response => response.json())
            .then((response => {
                if (response.status === 400) {
                    alert('To do could not be set as undone');
                }
            }))
            .then(setDoneClick(prev => !prev))
            .then(props.setIsDone(false))
        }
        console.log('changed status of to do')
    }

    const handleChange = () => {
        setChecked(prev => !prev);
        setDoneOrUnDone(!checked);
    }

    return (
        <input type="checkbox" checked={checked} onChange={handleChange}></input>
    )  
}
export default ToDoCheckbox;