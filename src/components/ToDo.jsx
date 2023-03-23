import { useContext, useEffect, useState } from "react";
import ToDoContext from "../context/ToDoContext";
import ToDoCheckbox from "./ToDoCheckbox";

import '../css/Table.css';

const ToDo = (props) => {
    const { setToDo } = useContext(ToDoContext);
    const [statusClassName, setStatusClassName] = useState('undone');
    const [isDone, setIsDone] = useState(props.toDo.isDone);
    const [colorClassName, setColorClassName] = useState('');

    useEffect(() => {
        if (props.toDo.dueDate) {
            let today = new Date();
            let dueDate = new Date(props.toDo.dueDate.replace('-', '/'));
    
            let differenceInTime = dueDate.getTime() - today.getTime();
    
            let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
            if (differenceInDays <= 7) {
                setColorClassName(prev => 'red');
            } else if (differenceInDays <= 14) {
                setColorClassName(prev => 'yellow');
            } else {
                setColorClassName(prev => 'green');
            }
            
        }
    }, [])

    const handleIsDoneChange = (status) => {
        setIsDone(prev => status);
    }

    useEffect(() => {
        if (isDone) {
            setStatusClassName(prev => 'done')
        } else {
            setStatusClassName(prev => 'undone')
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
                } else {
                    alert('There was an error deleting the to-do');
                }
            })
        }
    }

    const handleUpdate = (event) => {
        if(event) {
            setToDo(prev => props.toDo);
            props.handleShow();
        }
    }

    return (
        <>
        <tr className={colorClassName}>
            <td className={`to-do-checkbox ${statusClassName}`}><ToDoCheckbox toDo={props.toDo} setIsDone={handleIsDoneChange} /></td>
            <td className={`to-do-text ${statusClassName}`}>{props.toDo.text}</td>
            <td className={`to-do-priority ${statusClassName}`}>{priorityToText(props.toDo.priority)}</td>
            <td className={`to-do-due-date ${statusClassName}`}>{props.toDo.dueDate}</td>
            <td className={`to-do-actions ${statusClassName}`}>
            <input type="button" className={`action-btn ${statusClassName}`} onClick={handleUpdate} value="Update"></input>
            / 
            <input type="button" className={`action-btn ${statusClassName}`} onClick={handleDelete} value="Delete"></input>
            </td>
        </tr>
     </>
    )
}
export default ToDo;