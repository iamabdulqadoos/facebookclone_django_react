import "./Post.css";
import { useState } from "react";

import CommentSection from "../Comments/CommentSection";
import ShareModal from "../ShareModal/ShareModal";

export default function Post({ post, onLike }) {
    const [commentsCount, setCommentsCount] = useState(
        post.comments_count || 0
    );

    const [showComments, setShowComments] = useState(false);

    const [showShareModal, setShowShareModal] = useState(false);

    return (
        <>
            <div className="post">
                {/* ========================= */}
                {/* Header */}
                {/* ========================= */}

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

                {/* ========================= */}
                {/* Content */}
                {/* ========================= */}

                {post.content && (
                    <div className="post-content">
                        <p>{post.content}</p>
                    </div>
                )}

                {/* ========================= */}
                {/* Image */}
                {/* ========================= */}

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        className="post-image"
                    />
                )}

                {/* ========================= */}
                {/* Statistics */}
                {/* ========================= */}

                <div className="post-stats">
                    <div className="likes-count">
                        ❤️ {post.likes_count}
                    </div>

                    <div className="post-meta">
                        <span>{commentsCount} Comments</span>

                        <span>
                            {post.share_count || 0} Shares
                        </span>
                    </div>
                </div>

                <hr />

                {/* ========================= */}
                {/* Facebook Action Buttons */}
                {/* ========================= */}

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
                        className="action-btn"
                        onClick={() =>
                            setShowShareModal(true)
                        }
                    >
                        ↗️ Share
                    </button>
                </div>

                {/* ========================= */}
                {/* Comments */}
                {/* ========================= */}

                {showComments && (
                    <CommentSection
                        postId={post.id}
                        setCommentsCount={
                            setCommentsCount
                        }
                    />
                )}
            </div>
            

            {/* ========================= */}
            {/* Share Modal */}
            {/* ========================= */}

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