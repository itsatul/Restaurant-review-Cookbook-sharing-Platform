import React from "react";
import styled from "styled-components";
import logoImage from "../assets/logo.svg";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
    background-color: #fff;
`;

const Logo = styled.img`
    width: 80px;
    height: 80px;
`;

const Nav = styled.nav`
    a {
        margin: 0 10px;
        text-decoration: none;
        color: black;

        &:hover {
            color: orange;
        }
    }
`;

const Button = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: darkorange;
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo src={logoImage}/>
            <Nav>
                <navLink to="/">Home</navLink>
                <a href="/search">Search</a>
                <a href="/profile">Profile</a>
                <Button>SIGNUP</Button>
                <Button>LOGIN</Button>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;
