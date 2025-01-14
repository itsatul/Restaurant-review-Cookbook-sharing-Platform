import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRestaurantData} from "../../slice/restaurantSlice.js";

// Styled component for the restaurant card
const StarRatingDiv = styled.div`
    max-width: 270px;
    height: 30px;
    border: 1px solid #EBEBEB;

    .productImage {
        width: 100%;
        height: 80%;
    }

    .rating {
        font-size: 1.2rem;
        color: #FFD700;
    }

    .star {
        font-size: 1.5rem;
    }
`;

export default function StarRating() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.restaurant.data);
    const status = useSelector((state) => state.restaurant.status);
    const error = useSelector((state) => state.restaurant.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRestaurantData());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    // Function to calculate the rounded rating
    const calculateStars = (rating) => {
        const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half

        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push("filled"); // Full star
            } else if (i === Math.floor(roundedRating) + 0.5) {
                stars.push("half"); // Half star
            } else {
                stars.push("empty"); // Empty star
            }
        }
        return stars;
    };

    return (
        <>
            {data.map((item) => {
                // Get the stars for the rating
                const stars = calculateStars(item.rating);

                return (
                    <StarRatingDiv key={item.id}>
                        <div className="rating">
                            {stars.map((star, index) => (
                                <span key={index} className={`star ${star}`}>
                                    {star === "filled" ? "★" : star === "half" ? "☆" : "☆"}
                                </span>
                            ))}
                        </div>
                    </StarRatingDiv>
                );
            })}
        </>
    );
}
