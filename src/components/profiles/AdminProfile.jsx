import { useState } from "react";

function AdminProfile({ admin }) {
  return (
    <div className="AdminProfile">
      <div className="profile-pic">
        {admin && <img src="/images/profile.png" alt="profile" />}
      </div>
      <div className="profile-content">
        <h2>Account details</h2>
        <div className="name-div">
          <h4>Name</h4>

          <div>Admin</div>
        </div>

        <div className="email-div">
          <h4>Email</h4>

          <div>{admin && admin.email}</div>
        </div>

        <div className="admin-pass">
          <div className="pass">
            <h4>Password:</h4>

            <div className="password-text">****</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminProfile;
