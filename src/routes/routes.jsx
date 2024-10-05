import  Root  from "../Layout/Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorElement from "../Pages/ErrorElement";
import AddTouristsSports from "../Pages/AddTouristsSports";
import Update from "../Pages/Update";
import MySpot from "../Pages/MySpot";
import PrivateRoute from "./PrivateRoute";
import AllTourSpots from "../Pages/AllTourSpots";
import SpotDetails from "../Pages/SpotDetails";

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
          path: '/all-spots',
          element:<AllTourSpots/> 
        },
        {
          path: '/spot/:id',
          element : <SpotDetails/>,
          loader: ({ params }) => fetch(`https://tourism-management-server-dun.vercel.app/singleSpot/${params.id}`)
      },
       
        {
          path: '/addTour',
          element: <PrivateRoute><AddTouristsSports></AddTouristsSports></PrivateRoute>
        },
        {
          path: '/update/:id',
          element: <PrivateRoute><Update></Update></PrivateRoute>
        },
        {
          path: '/mySpot',
          element: <PrivateRoute><MySpot></MySpot></PrivateRoute>
        },
        {
          path: '/mybookings',
          element: <PrivateRoute><MySpot></MySpot></PrivateRoute>
        }
      ]
    },
  ]);
export default router;