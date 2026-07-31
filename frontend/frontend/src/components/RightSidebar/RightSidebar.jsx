import "./RightSidebar.css";
import { contacts } from "../../data/data";

function RightSidebar() {
  return (
    <div className="right-sidebar">

      <div className="birthday-card">
        <h4>🎂 Birthdays</h4>

        <p>
          <strong>Ali Hassan</strong> and
          <strong> 2 others</strong> have birthdays today.
        </p>
      </div>

      <div className="sponsored-card">
        <h4>Sponsored</h4>

        <img
          src="https://picsum.photos/300/180"
          alt="Sponsored"
        />

        <p>Learn React & Django by building real projects.</p>
      </div>

      <div className="contacts-card">

        <h4>Contacts</h4>

        {contacts.map((user) => (
          <div className="contact" key={user.id}>

            <div className="contact-image">

              <img
                src={user.image}
                alt={user.name}
              />

              <span className="online"></span>

            </div>

            <span>{user.name}</span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RightSidebar;