import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {UserContextProvider} from "./providers/auth-provider";
import {BlogPostsProvider} from "./providers/blogposts-provider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <UserContextProvider>
          <BlogPostsProvider>
                <RouterProvider router={router} />
          </BlogPostsProvider>
      </UserContextProvider>
);



