import { useRef } from "react";

function InviteMember(props) {
  const emailRef = useRef();
  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    const data = {
      email: enteredEmail
    };

    props.onInvite(data);
    
  }

  function closeModalHandler() {
    props.onClose();
    alert("Member invited");
  }

  return (
    <div className="modal">
      <h2>Invite Member to Project</h2>
      <hr></hr>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Member Email: </label>
          <textarea rows="1" cols="30" type="text" required id="title" placeholder="User Email..." ref={emailRef} />
        </div>
        <div>
          <button className="btn">Invite</button>
          <button className="btn" onClick={closeModalHandler}>Cancel</button>
        </div>
      </form>
    </div>

  );
}

export default InviteMember;
