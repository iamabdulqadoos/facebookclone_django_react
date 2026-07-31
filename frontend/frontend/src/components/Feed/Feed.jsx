import "./Feed.css";
import { useEffect, useState } from "react";

import Stories from "./Stories";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";

import {
    getPosts,
    likePost,
    unlikePost,
} from "../../services/postService";

export default function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {

        try {

            const data = await getPosts();
            setPosts(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleLike = async (postId) => {

        const currentPost = posts.find(
            (post) => post.id === postId
        );

        if (!currentPost) return;

        try {

            if (currentPost.is_liked) {

                await unlikePost(postId);

                setPosts((previousPosts) =>
                    previousPosts.map((post) =>
                        post.id === postId
                            ? {
                                  ...post,
                                  is_liked: false,
                                  likes_count: post.likes_count - 1,
                              }
                            : post
                    )
                );

            } else {

                await likePost(postId);

                setPosts((previousPosts) =>
                    previousPosts.map((post) =>
                        post.id === postId
                            ? {
                                  ...post,
                                  is_liked: true,
                                  likes_count: post.likes_count + 1,
                              }
                            : post
                    )
                );

            }

        } catch (error) {

            console.error("Like Error:", error);

        }

    };

    return (

        <div className="feed">

            <Stories />

            <CreatePost />

            {

                posts.map((post) => (

                    <Post
                        key={post.id}
                        post={post}
                        onLike={handleLike}
                    />

                ))

            }

        </div>

    );

}
