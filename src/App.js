import ToDoSearchForm from './components/ToDoSearchForm';
import ToDoTable from './components/ToDoTable';
import ToDoModal from './components/ToDoModal';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
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
        <div>
          <ToDoSearchForm />
        </div>        
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
      </div>
    </div>
  );
}

export default App;