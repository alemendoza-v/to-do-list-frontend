import { useState } from 'react';
import '../Form.css';

const ToDoSearchForm = () => {
    const [form, setForm] = useState({
        text: "",
        priority: 0,
        status: 0
    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setForm((prev) => {
            return {...prev, [name]: value}
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    }

    return(
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-label">
                        <label>Name</label>
                    </div>
                    <div className="form-input">
                        <input className="name-form-input" type="text" name="name" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-label">
                        <label>Priority</label>
                    </div>
                    <div className="form-input">
                        <select 
                            className="priority-form-input"
                            name="priority" 
                            onChange={handleInputChange}
                        >
                            <option value="0">All</option>
                            <option value="3">High</option>
                            <option value="2">Medium</option>
                            <option value="1">Low</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="form-label">
                        <label>Status</label>
                    </div>
                    <div className="form-input">
                        <select 
                            className="status-form-input"
                            name="status"
                            onChange={handleInputChange}
                        >
                            <option value="0">All</option>
                            <option value="done">Done</option>
                            <option value="undone">Undone</option>
                        </select>
                        <input className="submit-btn" type="submit" value="Search"></input>
                    </div>
                </div>
        </form>           
      </div>
    )
}

export default ToDoSearchForm;