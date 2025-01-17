import {Link, useNavigate} from "react-router-dom";
import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from '../components/Authentication/authentication.style.js'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login, logout} from '../slice/userSlice.js'
import {api} from "../axios/axios.js"

const Login = () => {
        const baseUrl = 'https://luna-project-batch30.propulsion-learn.ch/backend/api'

        const [userInfo, setUserInfo] = useState({
            email: "",
            password: "",
        });
        const {email, password} = userInfo;
        const [error, setError] = useState(null);

        // const {username, password} = userInfo
        const dispatch = useDispatch();
        const navigate = useNavigate()

        const onChange = (e) => {
            setUserInfo({...userInfo, [e.target.name]: e.target.value});
        }

        const handleSubmit = (e) => {
            e.preventDefault();

            // Checks if user inputs are correct
            if (email !== "" && password !== "") {
                setError(null)
                api.post(baseUrl + "/auth/token/", userInfo)
                    .then((res) => {
                        setError(null)
                        dispatch(login(res.data));
                        localStorage.setItem("access", res.data.access);
                        const from = location.state?.from || {pathname: "/"};
                        navigate(from);
                    })
                    .catch(() => {
                        dispatch(logout());
                        localStorage.clear()
                        setError("Login Failed");
                    });
            } else {
                dispatch(logout());
                localStorage.clear()
                setError("Login Failed");
            }
        }

        return (
            <ContainerAuthDiv>
                <ContainerHeaderDiv>
                    <div className='name'>LOGIN</div>
                    <div className='bar'></div>
                </ContainerHeaderDiv>
                <ContainerBodyDiv>
                    <AuthFormForm>
                        <div className='input-box'>
                            <div className='input-wrapper'>
                                <input type='email' placeholder='E-Mail' name='email' onChange={onChange}/>
                            </div>
                            <div className='input-wrapper'>
                                <input type='password' placeholder='Password' name='password' onChange={onChange}/>
                            </div>
                        </div>
                        {error && <div className='error-box'>
                            <p>{error}</p>
                        </div>}
                        <div className='link-box'>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        {/* Add: to="/login" */}
                        <div className='input-box'>
                            <button onClick={handleSubmit}>Login</button>
                        </div>
                    </AuthFormForm>
                </ContainerBodyDiv>
            </ContainerAuthDiv>
        );
    }
;

export default Login;