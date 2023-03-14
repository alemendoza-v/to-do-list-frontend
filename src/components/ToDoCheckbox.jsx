import { useState } from "react";

const ToDoCheckbox = (props) => {
    const [checked, setChecked] = useState(props.toDo.isDone);

    const handleChange = () => {
        setChecked(!checked);
        if(!props.toDo.isDone) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}/done`, requestOptions)
            .then(response => response.json())
            .then(props.setIsDone());
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}/undone`, requestOptions)
            .then(response => response.json())
            .then(props.setIsDone());
        }
        
    }

    return (
        <input type="checkbox" checked={checked} onChange={handleChange}></input>
    )  
}
export default ToDoCheckbox;