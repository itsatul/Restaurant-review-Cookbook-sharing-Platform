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


export default function Router() {

    // changes will follow as pages are to be wrapped by layout with header and footer

    return (
        <BrowserRouter>
            <Routes>
                {/*placeholder for layout*/}
                {/*<Route element={<LayoutWithHeaderAndFooter/>}>*/}
                {/*placeholder for homepage*/}
                <Route element={<Layout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    {/*</Route>*/}
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/registration/message" element={<Message/>}/>
                    <Route path="/registration/verification" element={<Verification/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                    <Route path="*" element={<div>404 Page Not Found</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}