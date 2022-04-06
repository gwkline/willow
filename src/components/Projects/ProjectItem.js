import { useState } from "react";
import Modal from "../Modal";
import Backdrop from "../Backdrop";
import { getDatabase, ref, update, onValue } from "firebase/database";


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

  //deletes the project from realtime database
  function addMember(userEmail) {

    const db = getDatabase();
    const projectRef = ref(db, 'users');

    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
        for (let key in data) {
          if (key.email === userEmail) {
            let updates = {}
            updates['/users/' + key + '/projects/'] = props.id;
            update(ref(db, 'users/' + key), updates);
          }
        }
    
    });
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
        <button onClick={addMember}>Add member {'!'}</button>
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