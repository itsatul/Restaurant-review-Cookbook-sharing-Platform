import {Link} from "react-router-dom";
import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from '../components/Authentication/authentication.style.js'

const Login = () => {
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
                            <input type='text' placeholder='Username'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='Password'/>
                        </div>
                    </div>
                    <div className='link-box'>
                        <Link to="#">Forgot Password?</Link>
                    </div>
                    {/* Add: to="/login" */}
                    <div className='input-box'>
                        <button>Login</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default Login;