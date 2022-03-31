import { useState } from "react";
import Modal from "../Modal";
import Backdrop from "../Backdrop";

function ProjectItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function viewHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <>
      <li className="proj-display" style={{listStyle:'none'}}>
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <p>{props.users}</p>
          <p>{props.tasks}</p>
        </div>
        <div>
        <button onClick={viewHandler}>View Project</button>
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