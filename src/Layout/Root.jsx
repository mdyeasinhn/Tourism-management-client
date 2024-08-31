import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Shared/Nav";
import Footer from "../Pages/Footer";

const Root = () => {
    const loaction = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div className="container mx-auto">
              { noHeaderFooter || <Nav></Nav>}
            <Outlet></Outlet>
           {noHeaderFooter ||  <Footer></Footer>}
            

        </div>
    );
};

export default Root;