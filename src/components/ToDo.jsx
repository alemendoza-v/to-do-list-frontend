import { useContext, useEffect, useState } from "react";
import ToDoContext from "../context/ToDoContext";
import ToDoCheckbox from "./ToDoCheckbox";

const ToDo = (props) => {
    const { setToDo } = useContext(ToDoContext);
    const [className, setClassName] = useState('undone');
    const [isDone, setIsDone] = useState(props.toDo.isDone);

    const handleIsDoneChange = (status) => {
        setIsDone(prev => status);
    }

    useEffect(() => {
        if (isDone) {
            setClassName(prev => 'done')
        } else {
            setClassName(prev => 'undone')
        }
    }, [isDone]);

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
            setToDo(props.toDo);
            props.handleShow();
        }
    }

    return (
        <>
        <tr>
            <td className={`to-do-checkbox ${className}`}><ToDoCheckbox toDo={props.toDo} setIsDone={handleIsDoneChange} /></td>
            <td className={`to-do-text ${className}`}>{props.toDo.text}</td>
            <td className={`to-do-priority ${className}`}>{priorityToText(props.toDo.priority)}</td>
            <td className={`to-do-due-date ${className}`}>{props.toDo.dueDate}</td>
            <td className={`to-do-actions ${className}`}>
            <input type="button" className={`action-btn ${className}`} onClick={handleUpdate} value="Update"></input>
            / 
            <input type="button" className={`action-btn ${className}`} onClick={handleDelete} value="Delete"></input>
            </td>
        </tr>
     </>
    )
}
export default ToDo;