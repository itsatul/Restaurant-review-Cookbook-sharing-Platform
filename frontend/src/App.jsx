import Router from './routes'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from './slice/userSlice.js'
import axios from "axios";

function App() {
    /*
    // temporary url for dev
    // const baseUrl = 'https://motion.propulsion-home.ch/backend/api'
    const baseUrl = 'https://luna-project-batch30.propulsion-learn.ch/backend/api'

    const accessToken = useSelector((state) => state.user.access);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("access");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            axios.post(baseUrl + "/auth/token/verify/", {token})
                .then(() => {
                    dispatch(login({access: token, user: user}));
                })
                .catch(() => {
                    dispatch(logout());
                    localStorage.clear();
                });
        } else {
            dispatch(logout());
            localStorage.clear();
        }
    }, [dispatch]);


    if (accessToken || accessToken === null) return <Router/>;
    return <p>Loading</p>;
    */
    return <Router/>
}

export default App;
