import {PostCard} from "./postcard-related/post-card";
import {useContext, useEffect, useRef, useState} from "react";
import {Pagination, Spin} from "antd";
import {BlogPostsContext} from "../providers/blogposts-provider";

export function PostsList() {
    const {pagination, setPagination} = useContext(BlogPostsContext);
    const [posts, setPostsData] = useState({list: [], totalPostsNumber: 0});
    const postsSection = useRef();
    const [loading, setLoading] = useState(true);
    console.log("List boom");

    const fetchPosts = async() => {
        console.log(pagination);
        return await fetch(`${process.env.REACT_APP_API_URL}/posts?page=${pagination.page}&search=${pagination.query}&pageSize=${pagination.pageSize}`)
            .then(res => res.json()).then(json => {
                setPostsData(() => {
                    console.log("fetched json", json);
                    return {
                        list: json[1],
                        totalPostsNumber: json[0].posts_number
                    }
                })
            })
    }

    useEffect(() => {
        fetchPosts().then(() => {console.log("success"); setLoading(false);})
    }, [pagination]);

    if (loading) {
        return (
            <div style={{alignItems: "center"}}>
                <Spin/>
            </div>
        )
    }
    return (
        <>
            <div ref={postsSection} className={"posts-list"}>
                {posts.list.map((post) =>
                    <PostCard key={post.id} postData={post}/>
                )}
            </div>
            <div>
                <Pagination current={pagination.page} total={posts.totalPostsNumber} pageSize={pagination.pageSize} onChange={(page, pageSize) => {
                    setPagination((prev) => {
                        return {
                            ...prev,
                            page: pagination.pageSize !== pageSize ? 1 : page,
                            pageSize: pageSize
                        }});
                    setLoading(true);
                    postsSection.current.scrollIntoView();
                }}/>
            </div>
        </>
    )
}