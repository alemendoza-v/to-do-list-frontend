import ToDoCreateForm from './ToDoCreateForm';
import '../Modal.css';

const ToDoModal = (props) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <ToDoCreateForm handleClose={props.handleClose}/>
                <button className="close-btn" onClick={props.handleClose}>X</button>
            </section>
        </div>
    )
}
export default ToDoModal;