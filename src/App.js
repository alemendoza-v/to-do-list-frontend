import ToDoForm from './components/ToDoForm';
import ToDoTable from './components/ToDoTable';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);

    // fetch('/todos')
    //   .then(response => response.json())
    //   .then(data => {
    //     setToDos(data);
    //     setLoading(false);
    //   })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="body-container">
      <div className="inv-container">
        <div>
          <ToDoForm />
        </div>        
        <div className="new-button">
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