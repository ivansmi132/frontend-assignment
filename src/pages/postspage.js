import {useContext, useState} from "react";
import {BlogPostsContext} from "../providers/blogposts-provider";
import {PostCard} from "../components/postcard-related/post-card";
import {Header} from "../components/header/header";


export function PostsPage() {
    const {postsList} = useContext(BlogPostsContext);
    const [query, setQuery] = useState("");

    const handleUserInput = (evt) => {
        setQuery(evt.target.value);
    }

    return (
        <>
            <Header maintext={"Posts"} subtext={`Number of posts: ${postsList.length}`}></Header>

            <div className={"main-section"}>
                {postsList.length !== 0 && (
                    <div className={"posts-filter"}>
                        <h3>Filter posts by title:</h3>
                        <div>
                            <input type="text" onChange={handleUserInput}/>
                        </div>
                    </div>
                )}
                <div className={"posts-list"}>
                    {postsList.filter(post => post.title.toLowerCase().includes(query.toLowerCase())).map((post) =>
                        <PostCard postData={post}/>
                    )}
                </div>
            </div>
        </>
    );
}