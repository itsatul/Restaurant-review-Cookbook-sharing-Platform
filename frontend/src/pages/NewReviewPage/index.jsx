import styled from "styled-components";
import {api} from "../../axios/axios.js";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Star = styled.span`
    font-size: 60px;
    cursor: pointer;
    color: ${(props) => (props.active ? "#FFD700" : "#d3d3d3")};
`;

const StarRatingContainer = styled.div`
    display: inline-flex;
    justify-content: start;
    align-items: center;
    margin-top: 20px;
    margin-right: 500px;
`;

const MainPage = styled.div`
    padding: 2rem;
    text-align: center;
`;

const WriteReview = styled.div`
    width: 832px;
    height: 264.5px;
    margin-top: 96px;
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-family: "Roboto Thin";
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: auto;
    border-radius: 3px;
    border: 1px solid #ddd;
`;

const ReviewTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 18px;
    resize: vertical;
    color: rgba(187, 183, 183, 1);
    margin-top: 10px;
    outline: none;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: orange;
    color: rgba(0, 0, 0, 1);
    border: none;
    border-radius: 40px;
    cursor: pointer;
    width: 200px;
    height: 57.02px;
    margin-left: 650px;

    &:hover {
        background-color: darkorange;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    margin-right: 700px;
`;

const NewReview = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetchRestaurantPageData();
    }, [id]);

    const fetchRestaurantPageData = async () => {
        try {
            const response = await api.get(`/restaurants/${id}`);
            setRestaurant(response.data);
        } catch (err) {
            setError("Failed to load restaurant data");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError("");  // Reset form errors


        if (userRating === 0) {
            setFormError("This field is required.");
            return;
        }

        if (reviewText.trim() === "") {
            setFormError("This field is required.");
            return;
        }

        try {

            const payload = {
                text_content: reviewText,
                rating: userRating,
                restaurant: {
                    name: restaurant.name,
                },
                user: {
                    username: "some_username",
                }
            };


            await api.post(`/reviews/new/${id}`, payload);
            alert("Review submitted successfully!");
            navigate(`/restaurant/${id}`);
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Failed to submit review!");
        }
    };

    const handleRatingChange = (rating) => {
        setUserRating(rating);
        setFormError("");
    };

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
        setFormError("");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <div
                style={{
                    backgroundImage: `url(${restaurant.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                        padding: "1rem 5rem",
                        backgroundColor: "rgba(19, 18, 18, 0.3)",
                    }}
                >
                    <h1>{restaurant.name}</h1>
                    <h2>{restaurant.category.name}</h2>
                    <h3>{restaurant.description || "No description available"}</h3>
                </div>
            </div>

            <MainPage>
                <StarRatingContainer>
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            active={index < userRating}
                            onClick={() => handleRatingChange(index + 1)}
                        >
                            ★
                        </Star>
                    ))}
                    <span style={{marginLeft: "10px", fontSize: "18px", color: "rgba(126, 126, 126, 1)"}}>
                        Select your rating
                    </span>
                </StarRatingContainer>

                <WriteReview>
                    <ReviewTextArea
                        value={reviewText}
                        onChange={handleReviewChange}
                        placeholder={`Your review helps others learn about great local businesses.
                        \nPlease don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees.`}
                    />
                </WriteReview>

                {formError && <ErrorMessage>{formError}</ErrorMessage>}

                <SubmitButton onClick={handleSubmit}>
                    SUBMIT
                </SubmitButton>
            </MainPage>
        </Container>
    );
};

export default NewReview;
