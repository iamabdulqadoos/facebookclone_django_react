import "./CommentSection.css";
import { useEffect, useState } from "react";

import {
    getComments,
    createComment,
    deleteComment,
} from "../../services/postService";

export default function CommentSection({
    postId,
    setCommentsCount,
}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {

        try {

            const data = await getComments(postId);

            setComments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleComment = async () => {

        if (!comment.trim()) return;

        try {

            const response = await createComment(
                postId,
                comment
            );

            setComments((previousComments) => [
                ...previousComments,
                response.data,
            ]);

            // Update comment count instantly
            if (setCommentsCount) {
                setCommentsCount((previous) => previous + 1);
            }

            setComment("");

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (commentId) => {

        try {

            await deleteComment(commentId);

            setComments((previousComments) =>
                previousComments.filter(
                    (item) => item.id !== commentId
                )
            );

            // Update comment count instantly
            if (setCommentsCount) {
                setCommentsCount((previous) => previous - 1);
            }

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="comment-section">

            <div className="comment-input">

                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                />

                <button onClick={handleComment}>
                    Post
                </button>

            </div>

            {loading ? (

                <p>Loading comments...</p>

            ) : (

                comments.map((item) => (

                    <div
                        key={item.id}
                        className="comment-card"
                    >

                        <div>

                            <strong>
                                {item.username}
                            </strong>

                            <p>
                                {item.comment}
                            </p>

                            <small>
                                {new Date(
                                    item.created_at
                                ).toLocaleString()}
                            </small>

                        </div>

                        <button
                            className="delete-comment"
                            onClick={() =>
                                handleDelete(item.id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>

    );

}