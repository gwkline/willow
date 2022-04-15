import { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import Backdrop from "../Backdrop";
import { getDatabase, ref, update, set, get } from "firebase/database";
import InviteMember from "./InviteMember";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";



function ProjectItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inviteModalOpen, openInviteModal] = useState(false);
  const [user] = useAuthState(auth);


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
    const projectRef = ref(db, 'projects');
    const userRef = ref(db, 'users');

    get(projectRef).then((snapshot) => {
      const projects = snapshot.val()

      //for each project in the database
      for (let project in projects) {

        //if this project is the project to be deleted
        if (project === props.projKey) {

          //if the project owner is the current user
          if (projects[project].owner === user.uid) {


            get(userRef).then((snapshot) => {
              const data = snapshot.val();

              //for each user in the database
              for (let userID in data) {

                //for each project in the user's project list
                for (let thisProject in data[userID].projects) {

                  //check if this project is the project to be deleted
                  if (thisProject === props.projKey) {
                    console.log(userID)
                    update(ref(db, 'users/' + userID + '/projects/'), {
                      [props.id]: null
                    })
                  }
                }
              }
            })
          }
          else {
            alert("You must be the owner of a project to delete it");
          }
        }
      }
    })
  }


  function inviteHandler() {
    openInviteModal(true);
  }

  function addMember(email) {
    const db = getDatabase();
    const userRef = ref(db, 'users');
    get(userRef).then((snapshot) => {
      const data = snapshot.val();
      for (let userID in data) {
        if (data[userID].email === email.email) {
          set(ref(db, 'users/' + userID + '/projects/' + props.id), props.id)
        }
      }
    })
  }

  function inviteMemberHandler(email) {
    addMember(email);
    openInviteModal(false);
    alert("Member invited to project!");

  }

  function leaveProjectHandler() {
    const db = getDatabase();
    update(ref(db, 'users/' + user.uid + '/projects/'), {
      [props.id]: null
    })
  }


  return (
    <>
      <li className="proj-display" style={{ listStyle: 'none' }}>
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <div>

          <button onClick={viewHandler}>View Project {'>'}</button>
          <button onClick={deleteHandler}>Delete Project {'X'}</button>
          <button onClick={inviteHandler}>Invite Member {'+'}</button>
          <button onClick={leaveProjectHandler}>Leave Project {'-'}</button>
        </div>

        <div>
          {modalIsOpen && (
            <ProjectDetails
              currProj={props.id}
              onClose={closeModalHandler}
              title={props.title}
              description={props.description}
              key={props.projKey}
              messages={props.messages}
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