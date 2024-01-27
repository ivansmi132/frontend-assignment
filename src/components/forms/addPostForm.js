import {useContext, useEffect, useRef} from "react";
import {BlogPostsContext} from "../../providers/blogposts-provider";
import React from 'react';
import {Form, ImageInput, Textarea} from "./form-components";
import {useNavigate} from "react-router-dom";


export function AddPostForm() {
    const {addPost, imageURL, setNewImage} = useContext(BlogPostsContext);
    const submitBtn = useRef();
    const navigate = useNavigate();


    // since I store the image file in a global context, and it is shared between the EditPostForm and AddPostForm
    // we want to reset it when the component is dismounted whether the post addition went through or not
    useEffect(() => {
        return (() => setNewImage(null));
    }, []);


    function onSubmit(data) {
        data.image_url = imageURL;
        addPost(data);
        navigate("/posts/");
    }


    // pay attention that the Form is a custom component from "form-components"
    return (
        <div className={"form-container"}>

            <Form onSubmit={onSubmit}>
                <label>Title:</label>
                <Textarea name="title" maxLength={"80"} rows={3}/>
                <label>Content:</label>
                <Textarea name="content" rows={10}/>
                <ImageInput name="image_url"/>
                <input ref={submitBtn} type="submit" value="Add post" style={{display: "none"}}/>
            </Form>

            <div className={"admin-nav"}>
                {/*<button onClick={() => {loadPosts(); navigate("/posts/");}}>Load Posts</button>*/}
                <button onClick={() => submitBtn.current.click()}>Add post</button>
            </div>

        </div>
    )
}
