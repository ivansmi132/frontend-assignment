import {createContext, useContext, useState} from "react";
import {UserContext} from "./auth-provider";

// BlogPosts context is used to share the postsList state as well as the current imageFile state with the whole app
export const BlogPostsContext = createContext(null);

export function BlogPostsProvider({children}) {
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        query: ""
    })
    const [imageURL, setImageFile] = useState(null);
    const {user} = useContext(UserContext);

    function setNewImage(file){
        setImageFile(file);
    }

    async function getPostById(id) {
        return await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`).then(data => data.json());
    }

    async function addPost(data) {
        const postToSend = {...data}
        postToSend.posted_by = user.id;
        console.log(postToSend);
        await fetch(`${process.env.REACT_APP_API_URL}/posts`, {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(postToSend)})
    }

    async function deletePost(id) {
        await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {method: "DELETE"}).then(() => alert(`success! post ${id} deleted!`));
    }

    const value = {addPost, deletePost, getPostById, imageURL,
        setNewImage, pagination, setPagination}

    return (
        <BlogPostsContext.Provider value={value}>
            {children}
        </BlogPostsContext.Provider>
    )
}