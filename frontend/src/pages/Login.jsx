import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const ContainerLoginDiv = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: auto;
    //background-color: skyblue;
    color: #4C4C4C;    

    div {
        margin: auto;
    }
`

const ContainerHeaderDiv = styled.div`
    background-color: pink;
    padding: 4rem 0 5rem 0;
    font-weight: 700;

    .name {
        color: #333;
        text-align: center;
        font-size: 1.6rem;
        padding-bottom: 1rem;
        //padding: 1rem;
    }

    .bar {
        width: 100px;
        height: 3px;
        background-color: #E47D31;
    }
`

const ContainerBodyDiv = styled.div`
    background-color: beige;

`

const AuthFormForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
        font-weight: 700;
    div {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
    }

    input {
        background-color: white;
        border: solid lightgrey 1px;
        height: 3.5rem;
        width: 100%;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: inherit;
    }

    a {
        font-size: .8rem;
        display: block;

    }
    .link {
        justify-content: flex-end;
        margin-top: .5rem;
    }

    button {
        background-color: #E47D31;
        color: white;
        font-size: 1.5rem;
        font-weight: 400;
        padding: 1rem 5rem;
        border-radius: 5rem;
        margin-top: 1rem;
    }
`
const Login = () => {
    return (
        <ContainerLoginDiv>
            <ContainerHeaderDiv>
                <div className='name'>LOGIN</div>
                <div className='bar'></div>
            </ContainerHeaderDiv>
            <ContainerBodyDiv>
                <AuthFormForm>
                    <div className='inputbox'>
                        <input type='text' placeholder='Username'/>
                    </div>
                    <div className='inputbox'>
                        <input type='text' placeholder='Password'/>
                    </div>
                    <div className='link'>
                        <Link to="#">Forgot Password?</Link>
                    </div>

                    {/* Add: to="/login" */}
                    <div className='inputbox'>
                        <button>Login</button>
                    </div>
                </AuthFormForm>
            </ContainerBodyDiv>
        </ContainerLoginDiv>
    );
};

export default Login;