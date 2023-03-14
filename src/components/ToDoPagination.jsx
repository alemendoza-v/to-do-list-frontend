import { useContext, useEffect, useState } from 'react';
import '../css/Pagination.css';
import CurrentPageContext from '../context/CurrentPageContext';
import NextContext from '../context/NextContext';
import PagesContext from '../context/PagesContext';
import PrevContext from '../context/PrevContext';
import ToDosContext from '../context/ToDosContext';

const ToDoPagination = () => {
    const { next, setNext } = useContext(NextContext);
    const { prev, setPrev } = useContext(PrevContext);
    const { setToDos } = useContext(ToDosContext);
    const { pages, setPages } = useContext(PagesContext);
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext);

    const fetchPage = (url) => {
        console.log('fetching:' + url);
        fetch(url)
        .then(result => result.json())
        .then(
            (result => {
                const data = result.data;
                const p = result.prev;
                const n = result.next;
                setToDos(data);
                setNext(n);
                setPrev(p);
                if (n) {
                    let nextPage = parseInt(n.charAt(n.length - 1)) + 1;
                    if (!pages.includes(nextPage)) {
                        setPages(prev => [...prev, nextPage]);
                    }
                }
            })
        )
    }

    const handlePage = (event) => {
        const id = event.target.id;
        if (id === 'prev' && prev) {
            fetchPage(prev);
            setCurrentPage(currentPage - 1);
        } else if (id === 'next' && next) {
            fetchPage(next);
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <span onClick={handlePage} id='prev' className="left-arrow">&#60;</span>
            {pages.map(page => {
                if (page === currentPage) {
                    return <span key={page} className="page active">{page}</span>
                } else {
                    return <span key={page} className="page">{page}</span>
                }
            })}
            <span onClick={handlePage} id='next' className="right-arrow">&#62;</span>
        </div>
    )
}

export default ToDoPagination;