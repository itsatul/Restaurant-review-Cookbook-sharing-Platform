import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js"
import {useState} from "react";
import {api} from '../axios/axios.js'
import {useNavigate} from "react-router-dom";


const Registration = () => {
   const [userInfo, setUserInfo] = useState({
        email: "",
    });
    const [error, setError] = useState(null);
    const {email} = userInfo

    const navigate = useNavigate()

    const onChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Checks if user inputs are correct
        if (email !== "") {
            api.post("registration/", userInfo)
                .then(() => {
                    navigate("/registration/message", {state: {email: userInfo.email}})
                })
                .catch(() => {
                    setError("Registration is Failed")
                });
        } else {
            setError("Registration is Failed");
        }
    }

    return (
        <ContainerAuthDiv>
            <ContainerHeaderDiv>
                <div className='name'>REGISTRATION</div>
                <div className='bar'></div>
            </ContainerHeaderDiv>
            <ContainerBodyDiv>
                <AuthFormForm onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <div className='input-wrapper'>
                            <input type='email' placeholder='E-Mail address' name='email' onChange={onChange}/>
                        </div>
                    </div>
                    {error && <div className='error-box'>
                        <p>{error}</p>
                    </div>}
                    <div className='input-box'>
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default Registration;