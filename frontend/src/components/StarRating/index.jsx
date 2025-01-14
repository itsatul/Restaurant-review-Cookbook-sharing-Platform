import styled from "styled-components";

// Styled component for the restaurant card
const StarRatingDiv = styled.div`
    max-width: 270px;
    height: 30px;
    //border: 1px solid #EBEBEB;

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

export default function StarRating({rating}) {

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

    const stars = calculateStars(rating);

    return (
        <>
            {/*StarRating that returns the stars for the according prop that is passed*/}
            <StarRatingDiv>
                <div className="rating">
                    {stars.map((star, index) => (
                        <span key={index} className={`star ${star}`}>
                                    {star === "filled" ? "★" : star === "half" ? "☆" : "☆"}
                                </span>
                    ))}
                </div>
            </StarRatingDiv>
        </>
    );
}
