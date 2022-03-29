import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

function Project(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function viewHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
      setModalIsOpen(false);
  }

  return (
    <div>
      <h1>{props.text}</h1>
      <p>{props.description}</p>
      <div>
        <button onClick={viewHandler}>View Project</button>
      </div>
      {modalIsOpen && <Modal onClose={closeModalHandler}/>}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
}

export default Project;
