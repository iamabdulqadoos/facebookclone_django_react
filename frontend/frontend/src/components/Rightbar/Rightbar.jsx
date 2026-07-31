import "./Rightbar.css";

const contacts = [
  {
    id: 1,
    name: "Ali",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Ahmed",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Usman",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Sara",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    name: "Fatima",
    image: "https://i.pravatar.cc/150?img=15",
  },
];

function Rightbar() {
  return (
    <div className="rightbar">
      <h3>Contacts</h3>

      {contacts.map((user) => (
        <div className="contact" key={user.id}>
          <div className="contact-image">
            <img src={user.image} alt={user.name} />
            <span className="online"></span>
          </div>

          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Rightbar;