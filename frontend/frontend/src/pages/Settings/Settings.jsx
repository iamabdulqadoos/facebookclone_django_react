import React from "react";
import "./Settings.css";

const Settings = () => {

return (

<div className="settings-container">

<h1>Settings</h1>


<div className="settings-card">

<h2>Account Settings</h2>


<div className="setting-item">
<span>Personal Information</span>
<button>Edit</button>
</div>


<div className="setting-item">
<span>Change Password</span>
<button>Change</button>
</div>


<div className="setting-item danger">
<span>Deactivate Account</span>
<button>Deactivate</button>
</div>


</div>



<div className="settings-card">

<h2>Privacy</h2>


<div className="setting-item">
<span>Who can see my posts?</span>

<select>
<option>Public</option>
<option>Friends</option>
<option>Only Me</option>
</select>

</div>


<div className="setting-item">

<span>Friend Requests</span>

<select>
<option>Everyone</option>
<option>Friends of Friends</option>
</select>

</div>


</div>




<div className="settings-card">

<h2>Notifications</h2>


<div className="setting-item">

<span>Friend Requests</span>

<input type="checkbox" defaultChecked />

</div>


<div className="setting-item">

<span>Likes & Comments</span>

<input type="checkbox" defaultChecked />

</div>


</div>




<div className="settings-card">

<h2>Appearance</h2>


<div className="setting-item">

<span>Dark Mode</span>

<input type="checkbox"/>

</div>


</div>




<div className="settings-card logout">

<button>
Logout
</button>

</div>



</div>

)

}


export default Settings;