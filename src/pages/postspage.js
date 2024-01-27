import {useContext, useRef} from "react";
import {BlogPostsContext} from "../providers/blogposts-provider";

import {PostsList} from "../components/postsList";
import {Header} from "../components/header/header";




export const PostsPage = (function PostsPage() {
    const {
        pagination,
        setPagination,
    } = useContext(BlogPostsContext);
    const postsSection = useRef(null);
    const searchQuery = useRef();


    console.log("postpage up, current:", pagination.current, "query:", pagination.query);



    const handleUserInput = (evt) => {
        setPagination((prev) => {
            return {
                ...prev,
                current: 1,
                query: searchQuery.current.value
            }
        });
    }

    return (
        <>
            <Header maintext={"posts"}/>
            <div ref={postsSection} className={"main-section"}>
                <div className={"posts-filter"}>
                    <h3>Search post with:</h3>
                    <div>
                        <input ref={searchQuery} defaultValue={pagination.query} type="text"/>
                        <button onClick={handleUserInput}>search</button>
                        {pagination.query && <button onClick={() => {searchQuery.current.value = ""; setPagination((prev) => {
                            return {
                                ...prev,
                                current: 1,
                                query: ""
                            }
                        });}}>show all</button>}
                    </div>
                </div>
                <PostsList />
            </div>
        </>
    );
})