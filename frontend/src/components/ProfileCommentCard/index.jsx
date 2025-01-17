import styled from "styled-components";
import {useUserComments} from "../../hooks/useUserComments.js";

const ReviewCardDiv = styled.div`
    width: 100%;
    //border: 1px solid #EBEBEB;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    
    .comment-title {
        font-size: 20px;
        font-weight: 400;
    }
    
    .comment-body {
        font-size: 16px;
        font-weight: 300;
    }
`

export default function ProfileCommentCard({userId, activeNav}) {

    const {data: userCommentData, status: userCommentStatus, error: userCommentError} = useUserComments(userId, activeNav)

    if (userCommentStatus === "loading") {
        return <p>Loading reviews...</p>;
    }

    if (userCommentStatus === "error") {
        return <p>Error loading reviews: {userCommentError.message}</p>;
    }

    if (!userCommentData) {
        return <p>No reviews found for this user.</p>;
    }

    return (
        <>
            {userCommentData.map((comment) => (
                <ReviewCardDiv key={comment.id}>
                    <p className={'comment-title'}>Review {comment.restaurant_review.id}</p>
                   <p className={'comment-body'}>{comment.comment}</p>
                </ReviewCardDiv>
            ))}
        </>
    )
}