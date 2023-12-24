import {useContext, useEffect, useRef} from "react";
import {BlogPostsContext} from "../../providers/blogposts-provider";
import React from 'react';
import {Form, ImageInput, Textarea} from "./form-components";
import {useNavigate} from "react-router-dom";


export function AddPostForm() {
    const {addPost, preview, changePreviewImage, loadPosts} = useContext(BlogPostsContext);
    const submitBtn = useRef();
    const navigate = useNavigate();

    // since I store the image preview in a global context, and it is shared between the EditPostForm and AddPostForm
    // we want to reset the preview image when the component is dismounted
    useEffect(() => {
        return () => {changePreviewImage(null)};
    }, []);


    function onSubmit(data) {
        data.image = data.image[0];
        addPost(data);
        changePreviewImage(null)
        navigate("/posts/");
    }

    // pay attention that the Form is a custom component from "form-components"
    return (
        <div className={"form-container"}>

            <Form onSubmit={onSubmit}>
                <label>Title:</label>
                <Textarea name="title" maxlength={"80"} rows={3}/>
                <label>Body:</label>
                <Textarea name="body" rows={10}/>
                <ImageInput name="image"/>
                <input ref={submitBtn} type="submit" value="Add post" style={{display: "none"}}/>
            </Form>

            {preview && <div className={"preview-image-container"}><img src={preview} alt={"preview"} width={200}/></div>}

            <div className={"admin-nav"}>
                <button onClick={() => {loadPosts(); navigate("/posts/");}}>Load Posts</button>
                <button onClick={() => submitBtn.current.click()}>Add post</button>
            </div>

        </div>
    )
}

// removing an image functionality will be implemented in the future