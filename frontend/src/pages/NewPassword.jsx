import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js";

const NewPassword = () => {
    return (
        <ContainerAuthDiv>
            <ContainerHeaderDiv>
                <div className='name'>NEW PASSWORD</div>
                <div className='bar'></div>
            </ContainerHeaderDiv>
            <ContainerBodyDiv>
                <AuthFormForm>
                    <div className='input-box-row'>
                        <div className='input-wrapper'>
                            <input type='email' placeholder='E-Mail address'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='Validation code'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' placeholder='Password'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' placeholder='Password repeat'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <button>Set New Password</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default NewPassword;