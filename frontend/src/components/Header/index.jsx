import React, {useEffect, useState} from "react";
import styled from "styled-components";
import logoImage from "../../assets/logo.svg";
import {NavLink, useNavigate} from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    align-items: center;
    background-color: #fff;
    border-bottom: 2px solid #EBEBEB;
`;

const Logo = styled.img`
    width: 100px;
    height: 60px;
`;

const Nav = styled.nav`
    a {
        margin: 0 10px;
        text-decoration: none;
        color: black;
        font-weight: normal;

        &:hover {
            color: orange;
        }

        &.active {
            color: orange;
            font-weight: bold;
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check localStorage for token when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("access"); // Remove token from localStorage
        setIsLoggedIn(false); // Update the login state
        navigate("/"); // Redirect to the homepage
    };
    return (
        <HeaderContainer>
            <Logo src={logoImage}/>
            <Nav>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/search">
                    Search
                </NavLink>
                <NavLink to="/profile">
                    Profile
                </NavLink>
                {isLoggedIn ? (
                    <>
                        <Button onClick={handleLogout}>LOGOUT</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => navigate("/registration")}>SIGNUP</Button>
                        <Button onClick={() => navigate("/login")}>LOGIN</Button>
                    </>
                )}
            </Nav>
        </HeaderContainer>
    );
}

export default Header;
