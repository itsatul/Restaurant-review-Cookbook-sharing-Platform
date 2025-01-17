import styled from "styled-components";
import LikeButton from "../LikeButton/index.jsx";
import CommentButton from "../CommentButton/index.jsx";
import React from "react";

const ReviewCardDiv = styled.div`
    max-width: 270px;
    min-width: 250px;
    height: auto;
    border: 1px solid #ebebeb;
    border-top: 8px solid #e47d31;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
`;

const ReviewCardTop = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;

    .profile-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .no-profile-placeholder {
            font-size: 12px;
            color: #9e9e9e;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
    }

    .user-info {
        .user-name {
            color: #e47d31;
            font-weight: 700;
            font-size: 16px;
            margin: 0;
        }

        .user-total-reviews {
            font-size: 12px;
            font-weight: 400;
            margin: 0;
            color: #757575;
        }
    }
`;

const ReviewCardMiddle = styled.div`
    padding: 0 1rem;
    margin-bottom: 1rem;

    .review-title {
        font-size: 16px;
        font-weight: 700;
        color: #e47d31;
        margin: 0 0 0.5rem;
    }

    .review-body {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3; /* Limits to 3 lines */
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0.5rem 0;
    border-top: 1px solid #ebebeb;

    button {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        color: #e47d31;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
            color: #d65b27;
        }
    }
`;

const ReviewCardBottom = styled.div`
    padding: 0.5rem 1rem;
    border-top: 1px solid #ebebeb;

    .comments-section-title {
        font-size: 14px;
        font-weight: 700;
        color: #333;
        margin-bottom: 0.5rem;
    }

    .latest-comments {
        font-size: 12px;
        color: #555;
        line-height: 1.4;

        span {
            font-weight: 700;
            color: #e47d31;
        }
    }
`;

export default function ReviewCard({review}) {
    // // Local state for likes
    // const [likeCount, setLikeCount] = useState(review.like_count);
    // const [liked, setLiked] = useState(false); // Assume the user hasn't liked initially
    //
    // // Function to handle like/unlike
    // const handleLikeToggle = async () => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/backend/api/reviews/like/${review.id}/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
    //             },
    //         });
    //
    //         if (response.ok) {
    //             // Toggle liked state and update count
    //             setLiked(!liked);
    //             setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    //         } else {
    //             console.error("Failed to toggle like status");
    //         }
    //     } catch (error) {
    //         console.error("Error liking/unliking the review:", error);
    //     }
    // };

    console.log('reviews from review card', review)
    return (
        <ReviewCardDiv key={review.id}>
            {/* Top Section */}
            <ReviewCardTop>
                <div className="profile-image">
                    {review.user.profile_picture ? (
                        <img
                            src={`https://luna-project-batch30.propulsion-learn.ch${review.user.profile_picture}`}
                            alt={`${review.user.username}'s profile`}
                        />
                    ) : (
                        <div className="no-profile-placeholder">No Image</div>
                    )}
                </div>
                <div className="user-info">
                    <p className="user-name">{review.user.username}</p>
                    <p className="user-total-reviews">Reviews in total: {review.user.review_count}</p>
                </div>
            </ReviewCardTop>

            {/* Middle Section */}
            <ReviewCardMiddle>
                <p className="review-title">{review.text_content}</p>
                <p className="review-body">{review.body}</p>
            </ReviewCardMiddle>

            {/* Buttons Section */}
            <ButtonDiv>
                <button>
                    <LikeButton/>
                    {/*{liked ? "Unlike" : "Like"} {likeCount}*/}
                    Likes {review.like_count}
                </button>
                <button>
                    <CommentButton/>
                    Comments {review.comment_count}
                </button>
            </ButtonDiv>

            {/* Bottom Section */}
            <ReviewCardBottom>
                <p className="comments-section-title">Latest Comments</p>
                {review.latest_comments?.map((comment, index) => (
                    <p className="latest-comments" key={index}>
                        <span>{comment.user}</span>: {comment.text}
                    </p>
                )) || <p className="latest-comments">No comments yet.</p>}
            </ReviewCardBottom>
        </ReviewCardDiv>
    );
}