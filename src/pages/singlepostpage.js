import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Header} from "../components/header/header";

import {SinglePostMenu} from "../components/postcard-related/single-post-menu";
import {BlogPostsContext} from "../providers/blogposts-provider";
import {Spin} from "antd";


export function SinglePostPage() {
    const {id} = useParams();
    const {getPostById} = useContext(BlogPostsContext);
    const [currentPost, setCurrentPost] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostById(id).then(post => {setCurrentPost(post); setLoading(false)});
    }, [])

    if (loading) {
        return (
            <div style={{alignItems: "center"}}>
                <Spin/>
            </div>
        )
    }

    return (
        <div>
            <Header maintext={currentPost.title} subtext={currentPost.creation_date} />
            <div className={"main-section"}>
                <div className={"single-post-body"}>
                    {currentPost.image_url && <img src={currentPost.image_url} alt={'post'}/>}
                    {currentPost.content}
                </div>
                <div style={{marginTop: "5%"}}>
                    <SinglePostMenu post={currentPost}/>
                </div>
            </div>

        </div>
    )
}