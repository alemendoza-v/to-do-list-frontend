import { useState, useEffect, useContext } from "react"
import ToDo from './ToDo';
import ToDosContext from '../ToDosContext';
import '../css/Table.css'

const ToDoTable = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { toDos, setToDos } = useContext(ToDosContext);

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
    }, [])

    const renderTableRows = () => {
        return toDos.map(toDo => {
            return (
                <ToDo key={toDo.id}
                toDo={toDo}/>
            )
        })
    }

    if(isLoading) {
        return <div>Loading...</div>
    }

    return toDos.length > 0 
    ? (
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
    ) : (
        <div> No to dos found </div>
    )
}

export default ToDoTable;