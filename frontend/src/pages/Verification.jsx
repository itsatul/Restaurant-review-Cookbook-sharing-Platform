import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js";
import {api} from "../axios/axios.js"
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Verification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: location.state?.email || "",
        code: "",
        password: "",
        repeat_password: "",
        first_name: "",
        last_name: "",
    });

    const {
        email,
        code,
        password,
        repeat_password,
        first_name,
        last_name,
    } = userInfo; //Destructure

    const [error, setError] = useState();


    const onChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            email !== "" &&
            code !== "" &&
            password !== "" &&
            repeat_password !== "" &&
            first_name !== "" &&
            last_name !== ""
        ) {
            setError(null);

            // Checks if user inputs are correct
            api.post("registration/validate/", userInfo)
                .then(() => {
                    alert("Success! Please log in.");
                })
                .then(() => {
                    navigate("/login");
                })
                .catch(() => {
                    setError("Verification failed");
                    // console.log("err:", err.response.data.detail);
                });
        } else {
            setError("Please fill in correctly");
        }
    };

    return (
        <ContainerAuthDiv>
            <ContainerHeaderDiv>
                <div className='name'>VERIFICATION</div>
                <div className='bar'></div>
            </ContainerHeaderDiv>
            <ContainerBodyDiv>
                <AuthFormForm>
                    <div className='input-box-row'>
                        <div className='input-wrapper'>
                            <input type='email' placeholder='E-Mail address' name='email' value={email} readOnly/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='Validation code' name='code' onChange={onChange}/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='First Name' name='first_name' onChange={onChange}/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='Last Name' name='last_name' onChange={onChange}/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' placeholder='Password' name='password' onChange={onChange}/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' placeholder='Password repeat' name='repeat_password'
                                   onChange={onChange}/>
                        </div>
                    </div>
                    {error && <div className='error-box'>
                        <p>{error}</p>
                    </div>}
                    <div className='input-box'>
                        <button onClick={handleSubmit}>Finish registration</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default Verification;