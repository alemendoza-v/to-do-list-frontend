import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import '../css/Form.css';
import "react-datepicker/dist/react-datepicker.css";

const ToDoCreateForm = (props) => {
    const [form, setForm] = useState({
        text: "",
        priority: 3,
        dueDate: ""
    });

    const [startDate, setStartDate] = useState(null);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setForm((prev) => {
            return {...prev, [name]: value}
        })
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setForm((prev) => {
            return {...prev, 'dueDate': date.toISOString().substring(0, 10)}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(form));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
        fetch('/todos', requestOptions)
        .then(response => response.json());
    }

    return(
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="create-form-label">
                        <label>Name</label>
                    </div>
                    <div className="create-form-input">
                        <input className="name-form-input" type="text" name="text" onChange={handleInputChange} />
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
                <input className="create-btn" type="submit" value="Create" onClick={props.handleClose}></input>
        </form>           
    )
}

export default ToDoCreateForm;