import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return  <div className="flex justify-center items-center h-screen">
       <span className="loading loading-bars loading-lg text-orange-500"></span>
    </div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={location.pathname}></Navigate>
};

export default PrivateRoute;