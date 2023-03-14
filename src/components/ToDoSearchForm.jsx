import { useContext, useState } from 'react';
import ToDosContext from '../ToDosContext';
import '../css/Form.css';
import UrlContext from '../UrlContext';
import PrevContext from '../PrevContext';
import NextContext from '../NextContext';
import CurrentPageContext from '../CurrentPageContext';
import PagesContext from '../PagesContext';

const ToDoSearchForm = () => {
    const [form, setForm] = useState({
        text: "",
        priority: 0,
        status: 0
    });

    const { setToDos } = useContext(ToDosContext);
    const { setUrl } = useContext(UrlContext);
    const { setPrev } = useContext(PrevContext);
    const { setNext } = useContext(NextContext);
    const { setCurrentPage } = useContext(CurrentPageContext);
    const { setPages } = useContext(PagesContext);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setForm((prev) => {
            return {...prev, [name]: value}
        })
    };

    const fetchFiltered = (url) => {
        fetch(url)
        .then((result) => result.json())
        .then(
            (result) => {
                const data = result.data;
                const p = result.prev;
                const n = result.next;
                setToDos(data);
                setUrl(url);
                setPrev(p);
                setNext(n);
                setPages([]);
                if (!p) {
                    setCurrentPage(1);
                    setPages(prev => [...prev, 1]);
                }
                if (n) {
                    let nextPage = parseInt(n.charAt(n.length - 1));
                    if (p) {
                        setCurrentPage(nextPage);
                    }
                    console.log('adding next page');
                    setPages(prev => [...prev, nextPage + 1]);
                } 
            },
            (error) =>  {
                console.log('There was an error fetching the data');
            }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let url = '/todos?filter_by=';
        if(form.text) {
            url += 'text,';
        }
        if(form.priority) {
            url += 'priority,';
        }
        if(form.status === 'done') {
            url += 'done';
        } else if (form.status === 'undone') {
            url += 'undone';
        }

        if(form.text) {
            url += `&text=${encodeURIComponent(form.text)}`;
        }

        if(form.priority) {
            url += `&priority=${encodeURIComponent(form.priority)}`;
        }

        if(url === '/todos?filter_by=') {
            url = '/todos';
        }
        fetchFiltered(url);
    }

    return(
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-label">
                        <label>Name</label>
                    </div>
                    <div className="form-input">
                        <input className="name-form-input" type="text" name="text" onChange={handleInputChange} />
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
                            <option value="undone">Pending</option>
                        </select>
                        <input className="submit-btn" type="submit" value="Search"></input>
                    </div>
                </div>
        </form>           
      </div>
    )
}

export default ToDoSearchForm;