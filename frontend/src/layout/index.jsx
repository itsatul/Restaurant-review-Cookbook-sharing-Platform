import React from 'react';
import styled from 'styled-components';
import Header from "../components/Header/index.jsx";
import Footer from "../components/Footer/index.jsx";
import {Outlet} from "react-router-dom";

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    width: 100%;
`;

function Layout() {
    return (
        <LayoutContainer>
            <Header/>
            <MainContent>
                <Outlet/>
            </MainContent>
            <Footer/>
        </LayoutContainer>
    );
}

export default Layout;
