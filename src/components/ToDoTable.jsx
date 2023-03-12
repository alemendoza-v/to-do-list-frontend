import { useState, useEffect, useContext, useRef } from "react"
import ToDo from './ToDo';
import ToDosContext from '../ToDosContext';
import ToDoUpdateModal from "./ToDoUpdateModal";
import ToDoContext from "../ToDoContext";
import '../css/Table.css'
import UrlContext from "../UrlContext";
import PrevContext from "../PrevContext";
import NextContext from "../NextContext";

const ToDoTable = () => {
    const [showModal, setShowModal] = useState(false);
    const { toDos, setToDos } = useContext(ToDosContext);
    const [ toDo, setToDo ] = useState(null);
    const value = { toDo, setToDo }; 
    const [modal, setModal] = useState(<></>);
    const [sortBy, setSortBy] = useState([]);
    const [orderBy, setOrderBy] = useState([]);
    const buttons = useRef({
        priorityUp: false,
        priorityDown: false,
        dueDateUp: false,
        dueDateDown: false,
    })
    const { url } = useContext(UrlContext);
    const { prev, setPrev } = useContext(PrevContext);
    const { next, setNext } = useContext(NextContext);

    useEffect(() => {
        fetch('/todos')
        .then((result) => result.json())
        .then(
            (result) => {
                const toDos = result.data;
                setToDos(toDos);
                setPrev(result.prev);
                setNext(result.next);
                console.log(prev);
                console.log(next);
            },
            (error) => {
                console.log('There was an error');
            })
    },[])
        
    const handleShowModal = () => {
        setShowModal(true);
    };
    
    const handleHideModal = (created) => {
        setShowModal(false);
        if(created) {
            window.location.reload(false);
        }
    };

    const renderTableRows = () => {
        return toDos.map(toDo => {
            return (
                <ToDo key={toDo.id}
                toDo={toDo}
                handleShow={handleShowModal}/>
            )
        })
    }

    useEffect(() => {
        if (toDo) {
            setModal(<ToDoUpdateModal show={showModal} handleClose={handleHideModal}/>);
        }
    }, [toDo, showModal]);
    
    const fetchSorted = (newUrl) => {
        fetch(newUrl)
        .then(result => result.json())
        .then(
            (result => {
                const data = result.data;
                setToDos(data);
                setPrev(result.prev);
                setNext(result.next);
            })
        )
    }

    useEffect(() => {
        let newUrl;

        if (sortBy.length > 0 && orderBy.length > 0) {
            if (url === '/todos') {
                newUrl = '?sort_by=' + sortBy.join(',') + '&order_by=' + orderBy.join(',');
            } else {
                newUrl = '&sort_by=' + sortBy.join(',') + '&order_by=' + orderBy.join(',');
            }
            fetchSorted(url + newUrl);
        }
    }, [sortBy, orderBy])

    const handleSortingChange = (type, order) => {
        let index = sortBy.indexOf(type);
        if (index > -1) {
            if (orderBy[index] === order) {
                setSortBy((prev) => prev.filter(i => i !== sortBy[index]));
                setOrderBy((prev) => prev.filter((_, i) => i !== index));
                return;
            }
            let list = [...orderBy];
            
            list[index] = order;
            setOrderBy(list);
        }  else {
            setSortBy(prev => [...prev, type]);
            setOrderBy(prev => [...prev, order]);
        }
    }

    const handleSwitch = (element) => {
        if (buttons.current[element.id]) {
            if (element.id.includes('Up')) {
                element.className = 'up-arrow up-white';
            } else {
                element.className = 'down-arrow down-white';
            }
        } else {
            if (element.id.includes('Down')) {
                element.className = 'down-arrow down-black';
            } else {
                element.className = 'up-arrow up-black';
            }
        }
    }

    const handleColorChange = () => {
        if(buttons.current['priorityUp'] && buttons.current['priorityDown']) {
            document.getElementById('priorityUp').className = 'up-arrow up-black';
            document.getElementById('priorityDown').className = 'down-arrow down-black';
        } else if (buttons.current['dueDateUp'] && buttons.current['dueDateDown']) {
            document.getElementById('dueDateUp').className = 'up-arrow up-black';
            document.getElementById('dueDateDown').className = 'down-arrow down-black';
        }

        Object.keys(buttons.current).map(key => {
            handleSwitch(document.getElementById(key));
        })   
        }

    return toDos.length > 0 
    ? (
        <>
            <ToDoContext.Provider value={value}>
                <table className="to-do-table">
                    <thead>
                        <tr>
                            <th className="table-done">Done</th>
                            <th className="table-name">Name</th>
                            <th className="table-priority">
                                Priority 
                                <div className="arrows">
                                    <div className="up-arrow up-black" id="priorityUp" onClick={
                                        () => { 
                                            buttons.current.priorityUp = !buttons.current.priorityUp;
                                            buttons.current.priorityDown = false;
                                            handleColorChange();
                                            handleSortingChange('priority', 'asc');
                                        }
                                    }
                                    >
                                    </div>
                                    <div className="down-arrow down-black" id="priorityDown" onClick={
                                        () => { 
                                            buttons.current.priorityDown = !buttons.current.priorityDown;
                                            buttons.current.priorityUp = false;
                                            handleColorChange();
                                            handleSortingChange('priority', 'desc');
                                        }
                                    }>
                                    </div>
                                </div>
                            </th>
                            <th className="table-due-date">
                                Due Date 
                                <div className="arrows">
                                        <div className="up-arrow up-black" id="dueDateUp" onClick={
                                            () => { 
                                                buttons.current.dueDateUp = !buttons.current.dueDateUp;
                                                buttons.current.dueDateDown = false;
                                                handleColorChange();
                                                handleSortingChange('dueDate', 'asc');
                                            }
                                        }>
                                        </div>
                                        <div className="down-arrow down-black" id="dueDateDown" onClick={
                                            () => { 
                                                buttons.current.dueDateDown = !buttons.current.dueDateDown;
                                                buttons.current.dueDateUp = false;
                                                handleColorChange();
                                                handleSortingChange('dueDate', 'desc');
                                            }
                                        }>
                                        </div>
                                </div>
                            </th>
                            <th className="table-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
                {modal}
            </ToDoContext.Provider>
        </>
    ) : (
        <div> No to dos found </div>
    )
}

export default ToDoTable;