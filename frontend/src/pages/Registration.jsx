import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js";


const Registration = () => {
    const [userInfo, setUserInfo] = useState({email: ""});

    return (
        <ContainerAuthDiv>
            <ContainerHeaderDiv>
                <div className='name'>REGISTRATION</div>
                <div className='bar'></div>
            </ContainerHeaderDiv>
            <ContainerBodyDiv>
                <AuthFormForm>
                    <div className='input-box'>
                        <div className='input-wrapper'>
                            <input type='email' placeholder='E-Mail address'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <button>Register</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default Registration;