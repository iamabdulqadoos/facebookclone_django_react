import "./Sidebar.css";

import {
  FaUserFriends,
  FaUsers,
  FaBookmark,
  FaChevronDown,
} from "react-icons/fa";

import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-item">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img"
        />
        <span>Abdul Qadoos</span>
      </div>

      <div className="sidebar-item">
        <FaUserFriends />
        <span>Friends</span>
      </div>

      <div className="sidebar-item">
        <FaUsers />
        <span>Groups</span>
      </div>

      <div className="sidebar-item">
        <MdOutlineOndemandVideo />
        <span>Watch</span>
      </div>

      <div className="sidebar-item">
        <FaBookmark />
        <span>Saved</span>
      </div>

      <div className="sidebar-item">
        <BsClockHistory />
        <span>Memories</span>
      </div>

      <div className="sidebar-item">
        <FaChevronDown />
        <span>See More</span>
      </div>

    </div>
  );
}

export default Sidebar;