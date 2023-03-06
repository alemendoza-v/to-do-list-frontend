import { useState, useEffect } from "react"
import ToDo from './ToDo';

const ToDoTable = () => {
    const [toDos, setToDos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        <table>
            <thead>
                <tr>
                    <th>Done</th>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderTableRows()}
            </tbody>
        </table>
    ) : (
        <div> No to dos found</div>
    )
}

export default ToDoTable;