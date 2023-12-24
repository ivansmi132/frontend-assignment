import React, {useContext} from "react";
import {BlogPostsContext} from "../../providers/blogposts-provider";
import {useForm} from "react-hook-form";


/*
The form-components contains all the custom input and form components.
I've decided to split the form into components to make them more easily customizable, the code more readable,
and because I wanted to reuse the components across both the AddPostForm and EditPostForm forms.
I used the "Smart Form Component" section from the "react-hook-form" for reference:
https://react-hook-form.com/advanced-usage#SmartFormComponent
The motivation is to create custom input components that are still managed by the react-hook-form api.
 */

export function Textarea({register, name, errors, ...rest}) {

    return (
        <>
        <textarea {...register(name, {required: `must enter ${name}`})} {...rest} style={errors[name] && {borderColor:"red"}}/>
            {errors[name] && <span style={{color:"red"}}>{errors[name].message}</span>}
        </>
    )
}

export function ImageInput({register, name, ...rest}) {
    const {changePreviewImage} = useContext(BlogPostsContext);

    function onImageChange(evt) {
        const currentImage = evt.target.files[0];
        changePreviewImage(URL.createObjectURL(currentImage));
    }

    return (
        <input type="file" accept="image/*" {...register(name)} {...rest} onChange={onImageChange}/>
    )
}

export function DropdownSelectPostById({register, name, options, setSelectedPost, ...rest}) {
    const {postsList, getPostById, changePreviewImage} = useContext(BlogPostsContext);

    function updateSelectedPost(evt) {

        // the empty string corresponds to the value of the "Select Post" option, which we make dysfunctional
        if (evt.target.value === "") {
            return;
        }

        const selectedPostFromDropdown = getPostById(evt.target.value);
        setSelectedPost(selectedPostFromDropdown);

        if (selectedPostFromDropdown.image) {
            changePreviewImage(URL.createObjectURL(selectedPostFromDropdown.image));
        } else {changePreviewImage(null)}
    }

    return (
        <select {...register(name)} {...rest} onChangeCapture={updateSelectedPost}>
            <option value={""}>Select Post</option>
            {postsList.map((post) => (
                <option value={post.id}>{post.title}</option>
            ))}
        </select>
    )
}


// This is a custom Form, see the documentation at the top of the script for reference. The Form component shares a single
// useForm with all of its children. It's important to note that the values of the form are set to correspond to the selectedPost state,
// which makes the EditPostForm form's fields dynamically update based on a post that the user selects
export function Form({defaultValues, children, onSubmit, selectedPost}) {
    const methods = useForm({defaultValues, values: selectedPost, shouldFocusError: false});
    const {handleSubmit, reset, formState: {errors}} = methods;

    function onFormSubmit(data) {
        onSubmit(data);
        reset(defaultValues);
    }

    return (
        <form className={"form-cls"} onSubmit={handleSubmit(onFormSubmit)}>
            {React.Children.map(children, (child) => {
                return child.props.name
                    ? React.createElement(child.type, {
                        ...{
                            ...child.props,
                            register: methods.register,
                            key: child.props.name,
                            errors: errors
                        },
                    })
                    : child
            })}
        </form>
    )
}
