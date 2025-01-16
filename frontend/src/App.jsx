import Router from './routes'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from './slice/userSlice.js'
import axios from "axios";

function App() {
    // temporary url for dev
    // const baseUrl = 'https://motion.propulsion-home.ch/backend/api'
    const baseUrl = 'https://luna-project-batch30.propulsion-learn.ch/backend/api'

    const accessToken = useSelector((state) => state.user.access);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (token) {
            axios.post(baseUrl + "/auth/token/verify/", {token})
                .then(() => {
                    dispatch(login({access: token}));
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

}

export default App;
