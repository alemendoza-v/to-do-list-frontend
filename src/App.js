import ToDoSearchForm from './components/ToDoSearchForm';
import ToDoTable from './components/ToDoTable';
import ToDoModal from './components/ToDoModal';
import ToDoPagination from './components/ToDoPagination';
import ToDosContext from './ToDosContext';
import UrlContext from './UrlContext';
import NextContext from './NextContext';
import PrevContext from './PrevContext';
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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = (created) => {
    setShowModal(false);
    if(created) {
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
          </div>
        </PrevContext.Provider>
        </NextContext.Provider>
        </UrlContext.Provider>
        </ToDosContext.Provider>
      </div>
    </div>
  );
}

export default App;