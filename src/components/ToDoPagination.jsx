import { useContext } from 'react';
import '../css/Pagination.css';
import NextContext from '../NextContext';
import PrevContext from '../PrevContext';
import ToDosContext from '../ToDosContext';

const ToDoPagination = () => {
    const { next, setNext } = useContext(NextContext);
    const { prev, setPrev } = useContext(PrevContext);
    const { setToDos } = useContext(ToDosContext);

    const fetchPage = (url) => {
        fetch(url)
        .then(result => result.json())
        .then(
            (result => {
                const data = result.data;
                console.log(data);
                setToDos(data);
                setNext(result.next);
                setPrev(result.prev);
            })
        )
    }

    const handlePage = (event) => {
        console.log(prev);
        console.log(next);
        const id = event.target.id;
        if (id === 'prev' && prev) {
            fetchPage(prev);
        } else if (id === 'next' && next) {
            fetchPage(next);
        }
    }

    return (
        <div>
            <span onClick={handlePage} id='prev' className="left-arrow"></span>
            <span className="page active">1</span>
            <span onClick={handlePage} id='next' className="right-arrow"></span>
        </div>
    )
}

export default ToDoPagination;