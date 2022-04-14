import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
} from "../../firebase";

function LeaveProject(props) {
  // const emailRef = useRef();
  // const [user] = useAuthState(auth);

  function submitHandler(event) {
    event.preventDefault();

    //const data = {
    //    email: enteredEmail
    //};
  }


  return (
    <div className="modal">
      <h2>Leave Project</h2>
      <hr></hr>
      <form onSubmit={submitHandler}>
        <div>
          <button className="btn">Leave</button>
        </div>
      </form>
    </div>

  );
}

export default LeaveProject;
