import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Form, ImageInput, Textarea} from "./form-components";
import {BlogPostsContext} from "../../providers/blogposts-provider";
import {Spin} from "antd";


export function EditPostForm() {
    let locationData = useLocation();
    const navigate = useNavigate();
    const submitBtn = useRef();
    const [loading, setLoading] = useState(true);

    // selectedPost state will be used to render the form fields based on the post we want to edit
    const [selectedPost, setSelectedPost] = useState();

    const {imageURL, setNewImage, getPostById} = useContext(BlogPostsContext);

    // this regex checks that text is not plain whitespaces
    const whitespacesRegex = /^\s+$/;


    // locationData is assigned a value if the admin is redirected to the edit form by clicking a post's edit button
    // it holds the relevant post data
    useEffect(() => {
        // when the EditPostForm component is mounted we check if we were redirected to here with a post
        if (locationData.state) {
            const id = locationData.state;
            getPostById(id).then((res) => {
                setSelectedPost(res);
                setNewImage(res.image_url);
                setLoading(false);
            });
        }

        // when the editPostForm component is unmounted we want to reset the global image, whether the edit went through or not
        return () => {setNewImage(null)};

    }, []);


    function onPostEdit(data) {
        const {title, content, id} = data;

        if (id === "") {
            alert("select a post");
            return;
        }

        if (whitespacesRegex.test(title) || whitespacesRegex.test(content)) {
            alert("please enter valid post content");
            return
        }

        selectedPost.title = title;
        selectedPost.content = content;
        selectedPost.image_url = imageURL;
        fetch(`/posts/${id}`, {method: "PUT", headers: {"content-type": "application/json"}, body: JSON.stringify(selectedPost)})
            .then(() => {
                navigate(`/posts/${selectedPost.id}`);
                window.scrollTo(0, 0);
            });
    }

    if (loading) {
        return (
            <div style={{alignItems: "center"}}>
                <Spin/>
            </div>
        )
    }

    // pay attention that the Form is a custom component from "form-components"
    // at this stage the form validation is not fully functional
    return (
        <div className={"form-container"}>
            <Form selectedPost={selectedPost} onSubmit={onPostEdit}>
                {/*<DropdownSelectPostById setSelectedPost={setSelectedPost} name="id"/>*/}
                <label>Title:</label>
                <Textarea name="title" maxLength={"80"} rows={3}/>
                <label>Content:</label>
                <Textarea name="content" rows={10}/>
                <ImageInput name="image_url"/>
                <input ref={submitBtn} type="submit" value="Apply edit" style={{display: "none"}}/>
            </Form>

            <div className={"admin-nav"}>
                <button onClick={() => submitBtn.current.click()}>Apply edit</button>
            </div>

        </div>
    )
}