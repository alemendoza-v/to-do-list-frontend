import { useContext, useState } from "react";
import { setToDoAsDone, setToDoAsUndone } from "../ApiCalls";
import DoneClickContext from "../context/DoneClickContext";

const ToDoCheckbox = (props) => {
    const [checked, setChecked] = useState(props.toDo.isDone);
    const { setDoneClick } = useContext(DoneClickContext);

    const setDoneOrUnDone = (checked) => {
        if(checked) {
            setToDoAsDone(props.toDo.id)
            .then((response) => {
                if (response.status === 400) {
                    alert('To do could not be set as done');
                }
            })
            .then(setDoneClick(prev => !prev))
            .then(props.setIsDone(true))
        } else {
            setToDoAsUndone(props.toDo.id)
            .then((response => {
                if (response.status === 400) {
                    alert('To do could not be set as undone');
                }
            }))
            .then(setDoneClick(prev => !prev))
            .then(props.setIsDone(false))
        }
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