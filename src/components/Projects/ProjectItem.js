import { useState } from "react";
import Modal from "../Modal";
import Backdrop from "../Backdrop";
import { getDatabase, ref, update } from "firebase/database";
import InviteMember from "./InviteMember";


function ProjectItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inviteModalOpen, openInviteModal] = useState(false);

  function viewHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
    openInviteModal(false);
  }

  //deletes the project from realtime database
  function deleteHandler() {
    const db = getDatabase();
    const updates = {};
    updates['/projects/' + props.id] = null;
    return update(ref(db), updates);
  }

  function inviteHandler() {
    openInviteModal(true);
  }

  function inviteMemberHandler(email) {
    console.log(email);
    //addMember(email);
    openInviteModal(false);
    
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
        <button onClick={inviteHandler}>Invite Member {'+'}</button>
      </div>
        <div>
          {modalIsOpen && (
            <Modal
              onClose={closeModalHandler}
              title={props.title}
              description={props.description}
            />
          )}
          {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
        </div>
        <div>
          {inviteModalOpen && (
            <InviteMember
              onInvite={inviteMemberHandler}
              onClose={closeModalHandler}
              email={props.email}
            />
          )}
          {inviteModalOpen && <Backdrop onClick={closeModalHandler} />}
        </div>
      </li>
    </>
    
  );
}

export default ProjectItem;