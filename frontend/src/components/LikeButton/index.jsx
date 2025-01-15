import styled from "styled-components";
import {useState} from "react";
import {AiOutlineLike} from "react-icons/ai";

const LikeButtonDiv = styled.button`
    background: #91919199;
    width: 45%;
    height: 33px;
    border-bottom-left-radius: 25px;
    border-top-left-radius: 25px;

    color: #FFFFFF;
    font-weight: 300;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    #like-icon {
        margin-left: 1rem;
        height: 35px;
    }
`

export default function LikeButton() {

    const [like, setLike] = useState(false);


    return (
        <>
            <LikeButtonDiv>
                <AiOutlineLike id={'like-icon'}/>
                <p>Like 10 </p>
            </LikeButtonDiv>
        </>
    )
}