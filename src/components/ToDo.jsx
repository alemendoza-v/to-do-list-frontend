import { useContext } from "react";
import ToDoContext from "../ToDoContext";
import ToDoCheckbox from "./ToDoCheckbox";

const ToDo = (props) => {
    const { setToDo } = useContext(ToDoContext);

    const priorityToText = (priority) => {
        switch(priority) {
            case 1:
                return 'Low';
            case 2:
                return 'Medium';
            case 3:
                return 'High';
            default:
                console.log('Error on converting priority to text');
                break;
        }
    }
    
    const handleDelete = (event) => {
        if(event) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/todos/${props.toDo.id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location.reload(false);
                }
            })
        }
    }

    const handleUpdate = (event) => {
        if(event) {
            console.log('updating');
            setToDo(props.toDo);
            props.handleShow();
        }
    }

    return (
        <>
            <tr>
                <td className="to-do-checkbox"><ToDoCheckbox toDo={props.toDo} /></td>
                <td className="to-do-text">{props.toDo.text}</td>
                <td className="to-do-priority">{priorityToText(props.toDo.priority)}</td>
                <td className="to-do-due-date">{props.toDo.dueDate}</td>
                <td className="to-do-actions">
                <input type="button" className="action-btn" onClick={handleUpdate} value="Update"></input>
                / 
                <input type="button" className="action-btn" onClick={handleDelete} value="Delete"></input>
                </td>
            </tr>
        </>
    )
}
export default ToDo;