import { useState, useEffect, useContext, useRef } from "react"
import ToDo from './ToDo';
import ToDosContext from '../context/ToDosContext';
import ToDoUpdateModal from "./ToDoUpdateModal";
import ToDoContext from "../context/ToDoContext";
import '../css/Table.css'
import UrlContext from "../context/UrlContext";
import PrevContext from "../context/PrevContext";
import NextContext from "../context/NextContext";
import CurrentPageContext from "../context/CurrentPageContext";
import PagesContext from "../context/PagesContext";

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
    const { setPrev } = useContext(PrevContext);
    const { setNext } = useContext(NextContext);
    const { setCurrentPage } = useContext(CurrentPageContext);
    const { setPages } = useContext(PagesContext);

    useEffect(() => {
        fetch('/todos')
        .then((result) => result.json())
        .then(
            (result) => {
                const toDos = result.data;
                const p = result.prev;
                const n = result.next;
                setToDos(toDos);
                setPrev(p);
                setNext(n);
                if (!p) {
                    setCurrentPage(1);
                    setPages(prev => [...prev, 1]);
                }
                if (n) {
                    let nextPage = parseInt(n.charAt(n.length - 1));
                    if (p) {
                        setCurrentPage(nextPage);
                    }
                    setPages(prev => [...prev, nextPage + 1]);
                } 
            },
            (error) => {
                console.log('There was an error');
            })
    },[])
        
    const handleShowModal = () => {
        setShowModal(true);
    };
    
    const handleHideModal = (event) => {
        setShowModal(false);
        if(event.target.id === "update") {
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
                            <th className="table-done">DONE</th>
                            <th className="table-name">NAME</th>
                            <th className="table-priority">
                                PRIORITY 
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
                                DUE DATE 
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
                            <th className="table-actions">ACTIONS</th>
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
        <div className="no-to-dos"> No to dos found </div>
    )
}

export default ToDoTable;