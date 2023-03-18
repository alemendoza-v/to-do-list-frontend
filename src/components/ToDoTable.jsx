import { useState, useEffect, useContext } from "react"
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
import ButtonsContext from "../context/ButtonsContext";

const ToDoTable = () => {
    const [showModal, setShowModal] = useState(false);
    const { toDos, setToDos } = useContext(ToDosContext);
    const [ toDo, setToDo ] = useState(null);
    const value = { toDo, setToDo }; 
    const [modal, setModal] = useState(<></>);
    const [sortBy, setSortBy] = useState([]);
    const [orderBy, setOrderBy] = useState([]);
    // const [buttons, setButtons] = useState({
    //     priorityUp: false,
    //     priorityDown: false,
    //     dueDateUp: false,
    //     dueDateDown: false,
    // })
    const { buttons, setButtons } = useContext(ButtonsContext);
    const { url } = useContext(UrlContext);
    const { setPrev } = useContext(PrevContext);
    const { setNext } = useContext(NextContext);
    const { setCurrentPage } = useContext(CurrentPageContext);
    const { setPages } = useContext(PagesContext);
    const [priorityUpClass, setPriorityUpClass] = useState(false);
    const [priorityDownClass, setPriorityDownClass] = useState(false);
    const [dueDateUpClass, setDueDateUpClass] = useState(false);
    const [dueDateDownClass, setDueDateDownClass] = useState(false);

    const fetchAllToDos = () => {
        fetch('/todos')
        .then((response) => response.json())
        .then((response) => {
                if (response.status === 200) {
                    const toDos = response.data;
                    const p = response.prev;
                    const n = response.next;
                    const pages = response.pages;
                    setToDos(prev => toDos);
                    setPrev(prev => p);
                    setNext(prev => n);
                    setPages(prev => {
                        let newPages = [];
                        for (let i = 1; i <=  pages; i++) {
                            newPages.push(i);
                        }
                        return newPages;
                    });
                    if (!p) {
                        setCurrentPage(prev => 1);
                    }
                    if (n) {
                        let nextPage = parseInt(n.charAt(n.length - 1));
                        if (p) {
                            setCurrentPage(prev => nextPage);
                        }
                    } 
                } else if (response === 400) {
                    console.log('There was an error fetching the data');
                }
                }
            )
    }

    useEffect(() => {
        fetchAllToDos()
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

    const handleSwitch = (key) => {
        switch(key) {
            case 'priorityUp':
                if(buttons.priorityUp) {
                    setPriorityUpClass(prev => true);
                } else {
                    setPriorityUpClass(prev => false);
                }
                break;
            case 'priorityDown':
                if(buttons.priorityDown) {
                    setPriorityDownClass(prev => true);
                } else {
                    setPriorityDownClass(prev => false);
                }
                break;
            case 'dueDateUp':
                if(buttons.dueDateUp) {
                    setDueDateUpClass(prev => true);
                } else {
                    setDueDateUpClass(prev => false);
                }
                break;
            case 'dueDateDown':
                if(buttons.dueDateDown) {
                    setDueDateDownClass(prev => true);
                } else {
                    setDueDateDownClass(prev => false);
                }
                break;
            default:
                break;
        }
    }

    const handleColorChange = () => {
        if(buttons.priorityUp && buttons.priorityDown) {
            setPriorityUpClass(prev => false);
            setPriorityDownClass(prev => false);
        } else if (buttons.dueDateUp && buttons.dueDateDown) {
            setDueDateUpClass(prev => false);
            setDueDateDownClass(prev => false);
        }

        Object.keys(buttons).map(key => {
            handleSwitch(key);
        })   
    }

    useEffect(() => {
        handleColorChange();
    }, [buttons])

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
                                    <div className={priorityUpClass ? "up-arrow up-white" : "up-arrow up-black"} id="priorityUp" onClick={
                                        () => { 
                                            setButtons((prev) => {
                                                return {...prev, 'priorityUp': !prev.priorityUp, 'priorityDown': false}
                                            });
                                            handleSortingChange('priority', 'asc');
                                        }
                                    }
                                    >
                                    </div>
                                    <div className={priorityDownClass ? "down-arrow down-white" : "down-arrow down-black"} id="priorityDown" onClick={
                                        () => { 
                                            setButtons((prev) => {
                                                return {...prev, 'priorityDown': !prev.priorityDown, 'priorityUp': false}
                                            });
                                            handleSortingChange('priority', 'desc');
                                        }
                                    }>
                                    </div>
                                </div>
                            </th>
                            <th className="table-due-date">
                                DUE DATE 
                                <div className="arrows">
                                        <div className={dueDateUpClass ? "up-arrow up-white" : "up-arrow up-black"} id="dueDateUp" onClick={
                                            () => { 
                                                setButtons((prev) => {
                                                return {...prev, 'dueDateUp': !prev.dueDateUp, 'dueDateDown': false}
                                                });
                                                handleSortingChange('dueDate', 'asc');
                                            }
                                        }>
                                        </div>
                                        <div className={dueDateDownClass ? "down-arrow down-white" : "down-arrow down-black"} id="dueDateDown" onClick={
                                            () => { 
                                                setButtons((prev) => {
                                                return {...prev, 'dueDateDown': !prev.dueDateDown, 'dueDateUp': false}
                                                });
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