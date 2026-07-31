import { useRef, useState } from "react";
import { createPost } from "../../api/post";
import "./CreatePost.css";

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim() && !image) {
            alert("Please write something or select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);

        if (image) {
            formData.append("image", image);
        }

        try {
            setLoading(true);

            await createPost(formData);

            // Clear form
            setContent("");
            setImage(null);

            // Clear selected file
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Reload posts
            if (onPostCreated) {
                onPostCreated();
            }

        } catch (error) {
            console.log(error);
            alert("Failed to create post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post">

        <form onSubmit={handleSubmit}>

        <div className="post-top">

        <div className="avatar">
            T
        </div>

        <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />

    </div>

        {image && (
            <img
                src={URL.createObjectURL(image)}
                alt=""
                className="image-preview"
            />
        )}

    <div className="actions">

<label
htmlFor="imageUpload"
className="upload-btn"
>
📷 Photo / Video
</label>

<input
id="imageUpload"
ref={fileInputRef}
type="file"
hidden
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button
className="post-btn"
type="submit"
disabled={loading}
>
{loading ? "Posting..." : "Post"}
</button>

</div>

</form>

</div>
);
};

export default CreatePost;