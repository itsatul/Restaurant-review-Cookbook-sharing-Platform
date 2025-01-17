import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchPage from "../pages/SearchPage/index.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import Layout from "../layout/index.jsx";
import Login from "../pages/Login.jsx";
import Verification from "../pages/Verification.jsx";
import Registration from "../pages/Registration.jsx";
import Message from "../pages/Message.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import NewPassword from "../pages/NewPassword.jsx";
import LikeButton from "../components/LikeButton/index.jsx";
import RestaurantPage from "../pages/RestaurantPage/index.jsx";
import NewReview from "../pages/NewReviewPage/index.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import TestProtectedPage from "../pages/SearchPage/TestProtectedPage.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout with header and footer */}
                <Route element={<Layout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
                    <Route path="/new-review/:id" element={<NewReview/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/testprotected" element={<TestProtectedPage/>}/>
                    </Route>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/registration/message" element={<Message/>}/>
                    <Route path="/registration/verification" element={<Verification/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                    <Route path="*" element={<div>404 Page Not Found</div>}/>
                    <Route path="/test" element={<LikeButton/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
