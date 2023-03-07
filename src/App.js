import ToDoSearchForm from './components/ToDoSearchForm';
import ToDoTable from './components/ToDoTable';
import ToDoModal from './components/ToDoModal';
import ToDosContext from './ToDosContext';
import React, { useEffect, useState } from 'react';
import './css/App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState([]);
  const value = { toDos, setToDos };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = (created) => {
    setShowModal(false);
    if(created) {
      window.location.reload(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="body-container">
      <div className="inv-container">
        <ToDosContext.Provider value={value}>
          <>
            <ToDoSearchForm />
          </>        
          <div className="new-button">
            <ToDoModal show={showModal} handleClose={handleHideModal}/>
            <input type="button" value="+ New To Do" onClick={handleShowModal}></input>
          </div>
          <div className="to-do-container">
            <ToDoTable />
          </div>
          <div className="pagination-container">
          </div>
          <div className="metrics-container">
          </div>
        </ToDosContext.Provider>
      </div>
    </div>
  );
}

export default App;