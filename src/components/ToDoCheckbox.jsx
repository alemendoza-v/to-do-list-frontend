import { useContext, useEffect, useState } from "react";
import DoneClickContext from "../context/DoneClickContext";

const ToDoCheckbox = (props) => {
    const [checked, setChecked] = useState(props.toDo.isDone);
    const { setDoneClick } = useContext(DoneClickContext);

    const setDoneOrUnDone = () => {
        if(checked) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}/done`, requestOptions)
            .then(response => response.json())
            .then(setDoneClick(prev => !prev))
            .then(props.setIsDone(true))
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}/undone`, requestOptions)
            .then(response => response.json())
            .then(setDoneClick(prev => !prev))
            .then(props.setIsDone(false))
        }
    }

    useEffect(() => {
        setDoneOrUnDone()
    }, [checked])

    const handleChange = () => {
        setChecked(prev => !prev)
    }

    return (
        <input type="checkbox" checked={checked} onChange={handleChange}></input>
    )  
}
export default ToDoCheckbox;