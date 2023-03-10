import ToDoSearchForm from './components/ToDoSearchForm';
import ToDoTable from './components/ToDoTable';
import ToDoModal from './components/ToDoModal';
import ToDosContext from './ToDosContext';
import UrlContext from './UrlContext';
import React, { useState } from 'react';
import './css/App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState([]);
  const toDosValue = { toDos, setToDos };
  const [url, setUrl]  = useState('/todos');
  const urlValue = { url, setUrl };

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
        <UrlContext.Provider value={urlValue}>
        <ToDosContext.Provider value={toDosValue}>
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
          </div>
          <div className="metrics-container">
          </div>
        </ToDosContext.Provider>
        </UrlContext.Provider>
      </div>
    </div>
  );
}

export default App;