import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js";


const Verification = () => {
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
                            <input type='email' placeholder='E-Mail address'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='Validation code'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='username'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' placeholder='Location'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' placeholder='Password'/>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' placeholder='Password repeat'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <button>Finish registration</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default Verification;