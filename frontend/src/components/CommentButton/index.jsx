import styled from "styled-components";

const CommentButtonDiv = styled.button`
    background: #91919199;
    width: 45%;
    height: 33px;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;

    color: #FFFFFF;
    font-weight: 300;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    #like-icon {
        color: #FFFFFF;
        margin-right: 1rem;
    }
`

export default function CommentButton() {


    return (
        <>
            <CommentButtonDiv>
            </CommentButtonDiv>
        </>
    )
}
