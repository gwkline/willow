import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { deleteUser } from "firebase/auth";

function testAlert() {
  alert("This feature is still in testing");
}

function Settings() {
  return (
    <div>className="settingsPageContents"
      <div>
        <h1 className="page-title">This is the Settings page</h1>
      </div>
      <div>Click to toggle dark mode</div>
      <button className="dark_mode_btn" onClick={testAlert}>
        On/Off </button>
      <div>Change username/password</div>
      <button className="change_user_pwd_btn" onClick={testAlert}>
        Send reset email
      </button>
      <div>Delete your account</div>
      <button className="delete_acc_btn" onClick={testAlert}>
        Delete
      </button>
      <div>To see more detailed preferences, click below</div>
      <button className="more_pref_btn" onClick={testAlert}>
        View
      </button>
      
    </div>


  );
};

export default Settings;
