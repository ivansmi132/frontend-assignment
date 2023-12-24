import {useParams} from "react-router-dom";
import {useContext} from "react";
import {BlogPostsContext} from "../providers/blogposts-provider";
import {Header} from "../components/header/header";

import {SinglePostMenu} from "../components/postcard-related/single-post-menu";


export function SinglePostPage() {
    const {id} = useParams();
    const {getPostById} = useContext(BlogPostsContext);
    const post = getPostById(id);

    return (
        <>
            {post ? (
                <div>
                    <Header maintext={post.title} subtext={post.date} />
                    <div className={"main-section"}>
                        <div className={"single-post-body"}>
                            {post.image && <img src={URL.createObjectURL(post.image)} alt={'post'}/>}
                            {post.body}
                        </div>
                        <div style={{marginTop: "5%"}}>
                            <SinglePostMenu post={post}/>
                        </div>
                    </div>

                </div>
            ) : <h3>Post doesn't exist</h3>
            }
        </>
    )
}
