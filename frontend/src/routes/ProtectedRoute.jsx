import {Navigate, Outlet, useLocation,} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    const location = useLocation();
    const isAuthenticated = useSelector((store) => store.user.access);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{from: location}}/>;
    } else {
        return <Outlet/>;
    }
};

export default ProtectedRoute;

