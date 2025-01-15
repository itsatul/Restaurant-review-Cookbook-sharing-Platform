import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchPage from "../pages/SearchPage/index.jsx";


export default function Router() {

    // changes will follow as pages are to be wrapped by layout with header and footer

    return (
        <BrowserRouter>
            <Routes>
                {/*placeholder for layout*/}
                {/*<Route element={<LayoutWithHeaderAndFooter/>}>*/}
                {/*placeholder for homepage*/}
                <Route path="/home" element={<div>Home Page Placeholder</div>}/>
                <Route path="/search" element={<SearchPage/>}/>
                {/*</Route>*/}
                <Route path="*" element={<div>404 Page Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    )
}