import { useState } from "react";
import "./ShareModal.css";

const ShareModal = ({ postId, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Change this when you deploy
  const postUrl = `${window.location.origin}/post/${postId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      alert("Failed to copy link.");
    }
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(postUrl)}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      postUrl
    )}`,

    telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}`,

    email: `mailto:?subject=Check this post&body=${encodeURIComponent(
      postUrl
    )}`,
  };

  const openShare = (url) => {
    window.open(url, "_blank");
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Facebook Clone",
          text: "Check out this post!",
          url: postUrl,
        });
      } catch (err) {}
    } else {
      copyLink();
    }
  };

  return (
    <div className="share-overlay">
      <div className="share-modal">

        <div className="share-header">
          <h2>Share Post</h2>

          <button
            className="share-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="share-link-box">

          <input
            value={postUrl}
            readOnly
          />

          <button
            onClick={copyLink}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

        </div>

        <div className="share-grid">

          <button
            onClick={() => openShare(shareLinks.whatsapp)}
          >
            🟢
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.facebook)}
          >
            🔵
            <span>Facebook</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.twitter)}
          >
            ⚫
            <span>X</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.linkedin)}
          >
            🔷
            <span>LinkedIn</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.telegram)}
          >
            🔵
            <span>Telegram</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.email)}
          >
            ✉️
            <span>Email</span>
          </button>

        </div>

        <button
          className="native-share"
          onClick={nativeShare}
        >
          📤 Share
        </button>

      </div>
    </div>
  );
};

export default ShareModal;