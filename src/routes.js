import {createBrowserRouter} from "react-router-dom";
import {App} from "./App";
import {Homepage} from "./pages/homepage";
import {PostsPage} from "./pages/postspage";
import {SinglePostPage} from "./pages/singlepostpage";
import {AdminPage} from "./pages/adminpage";
import {AddPostForm} from "./components/forms/addPostForm";
import {EditPostForm} from "./components/forms/editPostForm";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Homepage/>
            },
            {
                path: "posts",
                element: <PostsPage/>
            },
            {
                path: "posts/:id",
                element: <SinglePostPage/>
            }
        ]
    },
    {
        path: "admin",
        element: <AdminPage />,
        children: [
            {
                path: "",
                element: <AddPostForm />
            },
            {
                path: "new_post",
                element: <AddPostForm />
            },
            {
                path: "edit_post",
                element: <EditPostForm />
            }

        ]
    },
    {basename: "http://localhost:3000"}
]);