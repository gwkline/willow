import { useState } from "react";
import Modal from "../Modal";
import Backdrop from "../Backdrop";
import { getDatabase, ref, update } from "firebase/database";


function ProjectItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function viewHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  //deletes the project from realtime database
  function deleteHandler() {
    const db = getDatabase();
    const updates = {};
    updates['/projects/' + props.id] = null;
    return update(ref(db), updates);
  }

  return (
    <>
      <li className="proj-display" style={{listStyle:'none'}}>
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <div>
        <button onClick={viewHandler}>View Project {'>'}</button>
        <button onClick={deleteHandler}>Delete Project {'X'}</button>
      </div>
      {modalIsOpen && (
        <Modal
          onClose={closeModalHandler}
          title={props.title}
          description={props.description}
        />
      )}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </li>
    </>
    
  );
}

export default ProjectItem;