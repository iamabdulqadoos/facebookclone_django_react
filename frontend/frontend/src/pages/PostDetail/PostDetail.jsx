import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../../components/Post/Post";
import { getPostById } from "../../services/postService";

export default function PostDetail() {

    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {

        loadPost();

    }, [id]);

    const loadPost = async () => {

        try {

            const data = await getPostById(id);

            setPost(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!post) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <Post
                post={post}
                onLike={() => {}}
            />

        </div>

    );

}