import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../pages/AddTask/AddTask";
import CompletedTask from "../pages/CompletedTask/CompletedTask";
import Home from "../pages/Home/Home";
import MyTask from "../pages/MyTask/MyTask";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>, 
            },
            {
                path:'/addtask',
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>, 
            },
            {
                path:'/mytask',
                element:<PrivateRoute><MyTask></MyTask></PrivateRoute>, 
            },
            {
                path:'/completedtask',
                element:<PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>, 
            },
        ]
    }
])