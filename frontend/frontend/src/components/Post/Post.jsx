import "./Post.css";
import { useState } from "react";

import CommentSection from "../Comments/CommentSection";

import {
    sharePost,
    unsharePost,
} from "../../services/postService";

export default function Post({ post, onLike }) {

    const [commentsCount, setCommentsCount] = useState(
        post.comments_count
    );

    const [sharesCount, setSharesCount] = useState(
        post.share_count
    );

    // This will work once we add is_shared to the backend serializer.
    const [shared, setShared] = useState(
        post.is_shared || false
    );

    const [showComments, setShowComments] = useState(false);

    const handleShare = async () => {

        try {

            if (shared) {

                await unsharePost(post.id);

                setShared(false);

                setSharesCount((previous) =>
                    Math.max(previous - 1, 0)
                );

            } else {

                await sharePost(post.id);

                setShared(true);

                setSharesCount((previous) => previous + 1);

            }

        } catch (error) {

            console.error("Share Error:", error);

        }

    };

    return (

        <div className="post">

            {/* Header */}

            <div className="post-header">

                {post.profile_picture ? (

                    <img
                        src={post.profile_picture}
                        alt={post.username}
                        className="profile-img"
                    />

                ) : (

                    <div className="profile-placeholder">

                        {post.username[0].toUpperCase()}

                    </div>

                )}

                <div>

                    <h4>{post.username}</h4>

                    <small>

                        {new Date(post.created_at).toLocaleString()}

                    </small>

                </div>

            </div>

            {/* Content */}

            {post.content && (

                <div className="post-content">

                    <p>{post.content}</p>

                </div>

            )}

            {/* Image */}

            {post.image && (

                <img
                    src={post.image}
                    alt="Post"
                    className="post-image"
                />

            )}

            {/* Statistics */}

            <div className="post-stats">

                <div className="likes-count">

                    ❤️ {post.likes_count}

                </div>

                <div className="post-meta">

                    <span>{commentsCount} Comments</span>

                    <span>{sharesCount} Shares</span>

                </div>

            </div>

            <hr />

            {/* Facebook Action Bar */}

            <div className="post-actions">

                {/* Like */}

                <button
                    className={
                        post.is_liked
                            ? "action-btn liked"
                            : "action-btn"
                    }
                    onClick={() => onLike(post.id)}
                >

                    👍 Like

                </button>

                {/* Comment */}

                <button
                    className="action-btn"
                    onClick={() =>
                        setShowComments(!showComments)
                    }
                >

                    💬 Comment

                </button>

                {/* Share */}

                <button
                    className={
                        shared
                            ? "action-btn liked"
                            : "action-btn"
                    }
                    onClick={handleShare}
                >

                    {shared ? "↩️ Unshare" : "↗️ Share"}

                </button>

            </div>

            {/* Comments */}

            {showComments && (

                <CommentSection
                    postId={post.id}
                    setCommentsCount={setCommentsCount}
                />

            )}

        </div>

    );

}