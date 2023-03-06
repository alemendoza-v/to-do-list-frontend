import ToDoCheckbox from "./ToDoCheckbox";

const ToDo = (props) => {

    return (
        <tr>
            <td><ToDoCheckbox toDo={props.toDo} /></td>
            <td>{props.toDo.text}</td>
            <td>{props.toDo.priority}</td>
            <td>{props.toDo.dueDate}</td>
            <td><a>Update</a> <a>Delete</a></td>
        </tr>
    )
}
export default ToDo;