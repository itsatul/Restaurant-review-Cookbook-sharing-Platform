import {
    AuthFormForm,
    ContainerAuthDiv,
    ContainerBodyDiv,
    ContainerHeaderDiv
} from "../components/Authentication/authentication.style.js";

const Message = () => {
    return (
        <ContainerAuthDiv>
            <ContainerHeaderDiv>
                <div className='name'>REGISTRATION</div>
                <div className='bar'></div>
            </ContainerHeaderDiv>
            <ContainerBodyDiv>
                <AuthFormForm>
                    <div className='input-box'>
                        <p>Thanks for your registration.</p>
                        <p> Our hard working monkeys are preparing a digital message called E-Mail that will be sent to
                            you soon. Since monkeys arent good in writing the message could end up in you junk folder.
                            Our apologies for any inconvienience.</p>
                    </div>
                    <div className='input-box'>
                        <button>Continue</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerAuthDiv>
    );
};

export default Message;