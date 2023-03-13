import { useContext, useEffect, useState } from 'react';
import '../css/Pagination.css';
import CurrentPageContext from '../CurrentPageContext';
import NextContext from '../NextContext';
import PagesContext from '../PagesContext';
import PrevContext from '../PrevContext';
import ToDosContext from '../ToDosContext';

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
            console.log('prev clicked');
            fetchPage(prev);
            setCurrentPage(currentPage - 1);
        } else if (id === 'next' && next) {
            console.log('next clicked');
            fetchPage(next);
            setCurrentPage(currentPage + 1);
        }
    }

    // useEffect(() => {
    //     const newValue = pages[pages.length - 1] + 1
    //     setPages(prev => [...prev, newValue])
    //     console.log(pages);
    // }, [next]);

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