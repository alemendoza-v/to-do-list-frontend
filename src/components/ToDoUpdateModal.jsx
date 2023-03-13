import ToDoUpdateForm from './ToDoUpdateForm';
import '../css/Modal.css';
import { useContext } from 'react';
import ToDoContext from '../ToDoContext';

const ToDoUpdateModal = (props) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    const { toDo } = useContext(ToDoContext);

    if(!toDo) {
        return ( <></> )
    } else {
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <ToDoUpdateForm handleClose={props.handleClose}/>
                    <button className="close-btn" id="close" onClick={props.handleClose}>X</button>
                </section>
            </div>
        ) 
    }
}
export default ToDoUpdateModal;