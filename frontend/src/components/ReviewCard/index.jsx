import styled from "styled-components";
import LikeButton from "../LikeButton/index.jsx";
import CommentButton from "../CommentButton/index.jsx";


const ReviewCardDiv = styled.div`
    //width: 20vw;
    max-width: 270px;
    min-width: 250px;
    height: 50vh;
    border: 1px solid #EBEBEB;
    border-top: 8px solid #E47D31;
    background: #FFFFFF;

    display: flex;
    flex-direction: column;
`

const ReviewCardTop = styled.div`
    border: 1px solid blueviolet;
    width: 100%;
    height: 20%;

    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1 fr 1fr;
    
    .user-name {
        color: #E47D31;
        font-weight: 700;
        font-size: 20px;
    }
    
    .user-total-reviews {
        font-size: 14px;
        font-weight: 700;
    }
`

const ReviewCardMiddle = styled.div`
    border: 1px solid darkslategrey;
    width: 100%;
    height: 40%;

    .review-title {
        font-size: 18px;
        font-weight: 700;
        color: #E47D31;

        padding-left: 1rem;
    }

    .review-body {
        display: -webkit-box; // flex-like layout for text
        -webkit-box-orient: vertical; /* Sets orientation to vertical */
        overflow: hidden; /* Ensures text overflow is hidden */
        text-overflow: ellipsis; /* Adds the ellipsis (...) */
        line-clamp: 3; /* Limits text to 3 lines */
        max-height: 4.5em; /* Adjust based on your line height (e.g., 1.5em per line) */
        line-height: 16px; /* Ensures consistent spacing between lines */
        padding-left: 0.5rem;
        font-size: 14px;
        font-weight: 700;
    }
`

const ButtonDiv = styled.div`
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1px;
`

const ReviewCardBottom = styled.div`
    border: 1px solid darkorchid;
    height: 25%;

`

export default function ReviewCard({review}) {

    return (
        <>
            {/*adding review data (username, review count, review title, review body, like count) to review card*/}
            <ReviewCardDiv key={review.id}>
                <ReviewCardTop>
                    <div className={'profile-image'}>profile image</div>
                    <div>
                        <p className={'user-name'}>{review.userId} username</p>
                        <p className={'user-total-reviews'}>{review.userId} Reviews in total</p>
                    </div>
                </ReviewCardTop>
                <ReviewCardMiddle>
                    <div className={'review-title'}>{review.title}</div>
                    <div className={'review-body'}>{review.body}</div>
                </ReviewCardMiddle>
                <ButtonDiv>
                    <LikeButton/>
                    <CommentButton/>
                </ButtonDiv>
                <ReviewCardBottom>
                    <div>Latest Comments</div>
                </ReviewCardBottom>
            </ReviewCardDiv>
        </>
    )
}