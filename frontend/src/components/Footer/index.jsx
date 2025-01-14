import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: #f9f9f9;
  font-size: 14px;
  color: gray;

  a {
    margin: 0 10px;
    text-decoration: none;
    color: gray;

    &:hover {
      color: orange;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <a href="/about-us">About Us</a>
      <a href="/press">Press</a>
      <a href="/blog">Blog</a>
      <a href="/ios">iOS</a>
      <a href="/android">Android</a>
      <span>© Copyright Luna 2018</span>
    </FooterContainer>
  );
}

export default Footer;
