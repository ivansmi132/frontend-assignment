import {createContext, useState} from "react";

// BlogPosts context is used to share the postsList state as well as the current imageFile state with the whole app
export const BlogPostsContext = createContext(null);

export function BlogPostsProvider({children}) {
    const [postsList, setPostsList] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    function setNewImage(file){
        setImageFile(file);
    }

    function getPostById(id) {
        const index = postsList.findIndex(post => post.id === id);
        return postsList[index];
    }

    function getCurrentDate() {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date = new Date();
        const day = date.getDate();
        const monthNumber = date.getMonth();
        const year = date.getFullYear();
        return `${day}-${months[monthNumber]}-${year}`

    }
    function addPost(post) {
        // this id system is imperfect since it can assign duplicated ids, at this stage of development this is ignored
        if (!post.id) {
            post.id = new Date().getMilliseconds().toString();
        }

        // the post ids fetched from the api are not strings, so we need to convert them
        post.id = post.id.toString();

        // this is so that "load posts" doesn't load posts with that were already fetched
        if (postsList.some(elem => elem.id === post.id)) {return}

        post.date = getCurrentDate();
        setPostsList(prev => [...prev, post]);
    }

    function deletePost(id) {
        setPostsList(postsList.filter(post => post.id !== id));
    }

    async function loadPosts() {
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/');
        const postsData = await postsResponse.json();
        await Promise.all(postsData.map(async post => {
            addPost(post)}
        ));
    }

    const value = {postsList, addPost, deletePost, getPostById, imageFile, setNewImage, loadPosts}

    return (
        <BlogPostsContext.Provider value={value}>
            {children}
        </BlogPostsContext.Provider>
    )
}