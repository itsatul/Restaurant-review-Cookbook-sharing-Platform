import styled from "styled-components";
import {useUserReviews} from "../../hooks/useUserReviews.js";
import StarRating from "../StarRating/index.jsx";

const ReviewCardDiv = styled.div`
    width: 100%%;
    border: 1px solid #EBEBEB;
    background: #FFFFFF;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    
    .restaurant-title {
        font-size: 20px;
        font-weight: 400;
    }
`

export default function ProfileReviewCard({userId, activeNav}) {

    const {data: userReviewData, status: userReviewStatus, error: userReviewError} = useUserReviews(userId, activeNav)

    if (userReviewStatus === "loading") {
        return <p>Loading reviews...</p>;
    }

    if (userReviewStatus === "error") {
        return <p>Error loading reviews: {userReviewError.message}</p>;
    }

    if (!userReviewData || userReviewData.length === 0) {
        return <p>No reviews found for this user.</p>;
    }

    return (
        <>
            {userReviewData.map((review) => (
                <ReviewCardDiv key={review.id}>
                    <p className={'restaurant-title'}>{review.restaurant.name}</p>
                    <StarRating rating={review.rating}></StarRating>
                   <p className={'restaurant-review'}>{review.text_content}</p>
                </ReviewCardDiv>
            ))}
        </>
    )
}