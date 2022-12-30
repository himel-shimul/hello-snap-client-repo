import { createBrowserRouter }  from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home/Home";
import Media from "../../Pages/Media/Media";
import PostDetails from "../../Pages/Media/PostDetails/PostDetails";
import SignUp from "../../SignUp/SignUp";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/media/:id',
                element: <PostDetails></PostDetails>,
                loader: ({params}) => fetch(`https://hello-server-steel.vercel.app/allPosts/${params.id}`)
            },
            {
                path: '/about',
                element: <About></About>
            },
        ]
    }
])
export default router;