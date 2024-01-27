import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../providers/auth-provider";
import {BlogPostsContext} from "../../providers/blogposts-provider";

export function SinglePostMenu({post}) {
    const {user} = useContext(UserContext);
    const {deletePost} = useContext(BlogPostsContext);

    return (
        <>
            {user &&
                <div className={"single-post-menu"}>
                    <div>
                        <p>post id: {post.id}</p>
                    </div>
                    <div>
                        <p>posted by: {post.posted_by}</p>
                    </div>
                    <div>
                        <Link to="../admin/edit_post" state={post.id}>edit</Link>
                    </div>
                    <div>
                        <button onClick={() => deletePost(post.id)}>delete</button>
                    </div>
                </div>
            }
        </>
    )
}
