import { useContext, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import '../css/Form.css';
import "react-datepicker/dist/react-datepicker.css";
import ToDoContext from '../context/ToDoContext';
import { updateToDo } from '../ApiCalls';

const ToDoUpdateForm = (props) => {
    const { toDo } = useContext(ToDoContext);

    const [form, setForm] = useState({
        text: toDo.text,
        priority: toDo.priority,
        dueDate: toDo.dueDate
    });

    const getDueDate = () => {
        if (toDo.dueDate) {
            return new Date(toDo.dueDate.replace("-", '/'));
        } else {
            return null;
        }
    }

    const [startDate, setStartDate] = useState(getDueDate());

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setForm((prev) => {
            return {...prev, [name]: value}
        })
    };

    const handleDateChange = (date) => {
        setStartDate(prev => date);
        setForm((prev) => {
            return {...prev, 'dueDate': date.toISOString().substring(0, 10)}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.text === "") {
            alert('Name must not be empty')
            return;
        }
        updateToDo(toDo.id, form)
        .then((response) => {
            if(response.status === 400) {
                alert(response.data);
            } else {
                props.handleClose(event)
            }
        })
    }

    return (
        <>
            <h3>Update To-do</h3>
            <form id="update" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="create-form-label">
                        <label>Name</label>
                    </div>
                    <div className="create-form-input">
                        <input className="name-form-input" type="text" name="text" onChange={handleInputChange} value={form.text}/>
                    </div>
                </div>
                <div className="row">
                    <div className="create-form-label">
                        <label>Priority</label>
                    </div>
                    <div className="create-form-input">
                        <select 
                            className="create-priority-form-input"
                            name="priority" 
                            onChange={handleInputChange}
                            value={form.priority}
                        >
                            <option value="3">High</option>
                            <option value="2">Medium</option>
                            <option value="1">Low</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="create-form-label">
                        <label>Due Date</label>
                    </div>
                    <div className="create-form-input">
                        <ReactDatePicker selected={startDate} onChange={(date) => handleDateChange(date)}/>
                    </div>
                </div>
                <input className="create-btn" type="submit" value="Update"></input>
            </form>           
        </>
    )
}

export default ToDoUpdateForm;