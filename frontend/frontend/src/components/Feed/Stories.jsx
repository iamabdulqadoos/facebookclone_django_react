import "./Stories.css";
import { stories } from "../../data/data";

function Stories() {
  return (
    <div className="stories">
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.image} alt={story.name} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories;