import { useState, useEffect, useContext } from "react"
import ToDo from './ToDo';
import ToDosContext from '../ToDosContext';
import ToDoUpdateModal from "./ToDoUpdateModal";
import ToDoContext from "../ToDoContext";
import '../css/Table.css'

const ToDoTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { toDos, setToDos } = useContext(ToDosContext);
    const [ toDo, setToDo ] = useState(null);
    const value = { toDo, setToDo }; 
    const [modal, setModal] = useState(<></>);
    
    useEffect(() => {
        fetch('/todos')
        .then((result) => result.json())
        .then(
            (result) => {
                const toDos = result.data;
                setToDos(toDos);
                setIsLoading(false);
            },
            (error) =>  {
                console.log('There was an error fetching the data');
                setIsLoading(false);
            }
            )
    })
        
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

    if(isLoading) {
        return <div>Loading...</div>
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
                                    <div className="up-arrow"></div>
                                    <div className="down-arrow"></div>
                                </div>
                            </th>
                            <th className="table-due-date">
                                Due Date 
                                <div className="arrows">
                                        <div className="up-arrow"></div>
                                        <div className="down-arrow"></div>
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