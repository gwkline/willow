import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { deleteUser } from "firebase/auth";

function Settings() {
  return (
    <div>className="settingsPageContents"
      <div>
      <h1 className="page-title">This is the Settings page</h1>
    </div>
    <div>Click to toggle dark mode</div>
    <button classname="dark_mode_btn">
    On/Off </button>
    <div>Change username/password</div>
    <button classname="change_user_pwd_btn" onClick={sendPasswordResetEmail}>
      Send reset email
    </button>
    <div>Delete your account</div>
    <button classname="delete_acc_btn" onClick={deleteUser}>
      Delete
    </button>
    <div>To see more detailed preferences, click below</div>
    <button classname="more_pref_btn">
      View
    </button>
    </div>
    

  );
};

export default Settings;
