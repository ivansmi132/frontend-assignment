import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {DropdownSelectPostById, Form, ImageInput, Textarea} from "./form-components";
import {BlogPostsContext} from "../../providers/blogposts-provider";


export function EditPostForm() {
    let locationData = useLocation();
    const navigate = useNavigate();
    const submitBtn = useRef();

    // selectedPost state will be used to render the form fields based on the post we want to edit
    const [selectedPost, setSelectedPost] = useState();

    const {postsList, imageFile, setNewImage} = useContext(BlogPostsContext);

    // this regex checks that text is not plain whitespaces
    const whitespacesRegex = /^\s+$/;


    // locationData is assigned a value if the admin is redirected to the edit form by clicking a post's edit button
    // it holds the relevant post data
    useEffect(() => {
        // when the EditPostForm component is mounted we check if we were redirected to here with a post
        if (locationData.state) {
            const postToEdit = locationData.state;
            setSelectedPost(postToEdit);

            if (postToEdit.image) {
                setNewImage(postToEdit.image);
            }
        }

        // when the editPostForm component is unmounted we want to reset the global image, whether the edit went through or not
        return () => {setNewImage(null)};

    }, []);


    function onPostEdit(data) {
        const {title, body, id} = data;

        if (id === "") {
            alert("select a post");
            return;
        }
        if (whitespacesRegex.test(title) || whitespacesRegex.test(body)) {
            alert("please enter valid post content");
            return
        }
        selectedPost.title = title;
        selectedPost.body = body;
        selectedPost.image = imageFile;

        navigate(`/posts/${selectedPost.id}`);
        window.scrollTo(0, 0);
    }


    if (postsList.length === 0) {
        return (<h2>There are no posts</h2>)
    }

    // pay attention that the Form is a custom component from "form-components"
    // at this stage the form validation is not fully functional
    return (
        <div className={"form-container"}>
            <Form selectedPost={selectedPost} onSubmit={onPostEdit}>
                <DropdownSelectPostById setSelectedPost={setSelectedPost} name="id"/>
                <label>Title:</label>
                <Textarea name="title" maxLength={"80"} rows={3}/>
                <label>Body:</label>
                <Textarea name="body" rows={10}/>
                <ImageInput name="image"/>
                <input ref={submitBtn} type="submit" value="Apply edit" style={{display: "none"}}/>
            </Form>

            {imageFile &&
                <div className={"preview-image-container"}><img src={URL.createObjectURL(imageFile)} alt={"preview"} width={200}/></div>}
            {imageFile && <button onClick={() => setNewImage(null)}>remove photo</button>}

            <div className={"admin-nav"}>
                <button onClick={() => submitBtn.current.click()}>Apply edit</button>
            </div>


        </div>
    )
}
