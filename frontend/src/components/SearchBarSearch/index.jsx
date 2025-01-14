import styled from "styled-components";
import {useState} from "react";

const SearchBarWrapper = styled.div`
    width: 100%;
    display: flex;
`

const SearchBarInput = styled.input`
    width: 80%;
    height: 50px;
    border: none;
    border-bottom: 1px solid #EBEBEB;
`

const DropDownButton = styled.button`
    width: 20%;
    position: relative;
    background: none;
    border: none;
    border-bottom: 1px solid #EBEBEB;
    border-left: 1px solid #EBEBEB;

    .menu {
        background: yellow;
        margin-top: 1rem;
        width: 100%;
        position: absolute;
        list-style-type: none;
    }

    .button {
        border: 2px solid red;
    }

    .li {
        color: black;
        height: 1.5rem
    }

`

export default function SearchBarSearch() {

    const [open, setOpen] = useState(false)

    const handleButtonOpen = () => {
        setOpen(!open);
    }

    // test data
    const category = ['sushi', 'pizza', 'burger']

    return (
        <SearchBarWrapper>
            <SearchBarInput
                type="text"
                placeholder="Search"/>
            <DropDownButton onClick={handleButtonOpen}>Select a Category...
                {open ? (
                    <ul className="menu">
                        {category.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : null}
            </DropDownButton>
        </SearchBarWrapper>
    )
}