import "./Post.css";
import { useState, useRef } from "react";

import CommentSection from "../Comments/CommentSection";
import ShareModal from "../ShareModal/ShareModal";

export default function Post({ post, onLike }) {

    const [commentsCount, setCommentsCount] = useState(
        post.comments_count || 0
    );

    const [showComments, setShowComments] = useState(false);

    const [showShareModal, setShowShareModal] = useState(false);

    const [showHeart, setShowHeart] = useState(false);

    const lastTap = useRef(0);

    const handleDoubleLike = () => {

    onLike(post.id);

    if (!post.is_liked) {

        setShowHeart(true);

        setTimeout(() => {
            setShowHeart(false);
        }, 900);

    }

};

    const handleTouch = () => {

        const now = Date.now();

        if (now - lastTap.current < 300) {

            handleDoubleLike();

        }

        lastTap.current = now;

    };

    return (
        <>
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

                    <div className="post-user">
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

                    <div
                        className="post-image-container"
                        onDoubleClick={handleDoubleLike}
                        onTouchEnd={handleTouch}
                    >

                        <img
                            src={post.image}
                            alt="Post"
                            className="post-image"
                        />

                        {showHeart && (
                            <div className="heart-animation">
                                ❤️
                            </div>
                        )}

                    </div>

                )}

                {/* Statistics */}

                <div className="post-stats">

                    <div className="likes-count">
                        ❤️ {post.likes_count}
                    </div>

                    <div className="post-meta">

                        <span>
                            {commentsCount} Comments
                        </span>

                        <span>
                            {post.share_count || 0} Shares
                        </span>

                    </div>

                </div>

                <hr />

                {/* Action Buttons */}

                <div className="post-actions">

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

                    <button
                        className="action-btn"
                        onClick={() =>
                            setShowComments(!showComments)
                        }
                    >
                        💬 Comment
                    </button>

                    <button
                        className="action-btn"
                        onClick={() =>
                            setShowShareModal(true)
                        }
                    >
                        ↗️ Share
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

            {/* Share Modal */}

            {showShareModal && (

                <ShareModal
                    postId={post.id}
                    onClose={() =>
                        setShowShareModal(false)
                    }
                />

            )}

        </>
    );

}