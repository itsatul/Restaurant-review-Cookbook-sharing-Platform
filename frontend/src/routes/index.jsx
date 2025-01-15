import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchPage from "../pages/SearchPage/index.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import Layout from "../layout/index.jsx";
import LikeButton from "../components/LikeButton/index.jsx";


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
                    <Route path="*" element={<div>404 Page Not Found</div>}/>
                    <Route path="/test" element={<LikeButton/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}