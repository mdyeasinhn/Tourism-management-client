import  Root  from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorElement from "../Pages/ErrorElement";
import AddTouristsSports from "../Pages/AddTouristsSports";
import Update from "../Pages/Update";
import MySpot from "../Pages/MySpot";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorElement></ErrorElement>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path:'/login',
            element :<Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
       
        {
          path: '/addTour',
          element: <AddTouristsSports></AddTouristsSports>
        },
        {
          path: '/update/:id',
          element: <Update></Update>
        },
        {
          path: '/mySpot',
          element: <MySpot></MySpot>
        }
      ]
    },
  ]);
export default router;