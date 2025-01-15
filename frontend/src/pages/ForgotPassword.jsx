import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js";


const ForgotPassword = () => {
    return (
        <ContainerAuthDiv>
            <ContainerHeaderDiv>
                <div className='name'>FORGOT PASSWORD</div>
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
                        <button>Send Code</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default ForgotPassword;