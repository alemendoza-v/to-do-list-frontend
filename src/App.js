import ToDoSearchForm from './components/ToDoSearchForm';
import ToDoTable from './components/ToDoTable';
import ToDoModal from './components/ToDoModal';
import ToDoPagination from './components/ToDoPagination';
import ToDoMetrics from './components/ToDoMetrics';

import ToDosContext from './context/ToDosContext';
import UrlContext from './context/UrlContext';
import NextContext from './context/NextContext';
import PrevContext from './context/PrevContext';
import CurrentPageContext from './context/CurrentPageContext';
import PagesContext from './context/PagesContext';
import DoneClickContext from './context/DoneClickContext';

import React, { useState } from 'react';

import './css/App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState([]);
  const toDosValue = { toDos, setToDos };
  const [url, setUrl] = useState('/todos');
  const urlValue = { url, setUrl };
  const [prev, setPrev] = useState(null);
  const prevValue = { prev, setPrev };
  const [next, setNext] = useState(null);
  const nextValue = { next, setNext };
  const [currentPage, setCurrentPage] = useState(null);
  const currentPageValue = { currentPage, setCurrentPage };
  const [pages, setPages] = useState([]);
  const pagesValue = { pages, setPages };
  const [doneClick, setDoneClick] = useState(false);
  const doneClickValue = { doneClick, setDoneClick };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = (event) => {
    setShowModal(false);
    if(event.target.id === 'create') {
      window.location.reload(false);
    }
  };

  return (
    <div className="body-container">
      <div className="inv-container">
        <ToDosContext.Provider value={toDosValue}>
        <UrlContext.Provider value={urlValue}>
        <NextContext.Provider value={nextValue}>
        <PrevContext.Provider value={prevValue}>
        <CurrentPageContext.Provider value={currentPageValue}>
        <PagesContext.Provider value={pagesValue}>
        <DoneClickContext.Provider value={doneClickValue}>
          <>
            <ToDoSearchForm />
          </>        
          <div className="new-button">
            <ToDoModal show={showModal} handleClose={handleHideModal}/>
            <input type="button" value="+ New To Do" onClick={handleShowModal}></input>
          </div>
          <div className="to-do-container">
            <ToDoTable/>
          </div>
          <div className="pagination-container">
            <ToDoPagination/>
          </div>
          <div className="metrics-container">
            <ToDoMetrics/>
          </div>
        </DoneClickContext.Provider>
        </PagesContext.Provider>
        </CurrentPageContext.Provider>
        </PrevContext.Provider>
        </NextContext.Provider>
        </UrlContext.Provider>
        </ToDosContext.Provider>
      </div>
    </div>
  );
}

export default App;