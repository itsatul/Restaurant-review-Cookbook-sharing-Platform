import styled from "styled-components";
import { api } from "../../axios/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "../../components/StarRating/index.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RestaurentBannerDiv = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  flex-grow: 1;
  padding: 1rem 5rem;
  background-color: rgba(19, 18, 18, 0.3);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
  }
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

const ToastStyles = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #333;
    color: white;
    border-radius: 8px;
    padding: 16px;
    font-family: "Roboto", sans-serif;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .Toastify__toast--success {
    background-color: green;
  }

  .Toastify__toast--error {
    background-color: red;
  }

  .Toastify__toast-body {
    font-size: 16px;
    text-align: center;
  }

  button[aria-label="close"] {
    color: white;
  }
`;

const NewReview = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

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
    setFormError(""); // Reset form errors

    if (userRating === 0) {
      setFormError("This field is required.");
      return;
    }

    if (reviewText.trim() === "") {
      setFormError("This field is required.");
      return;
    }

    try {
      const token = localStorage.getItem("access");

      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const payload = {
        text_content: reviewText,
        rating: userRating,
      };

      await api.post(`/reviews/new/${id}/`, payload, config);

      toast.success("Review submitted successfully!");
      // Delay the navigation by 6 seconds to show the toast
        setTimeout(() => {
            navigate(`/restaurant/${id}`);
        }, 6000); // 6000 ms = 5 seconds
    } catch (err) {
      console.error("Error submitting review:", err);

      if (err.response) {
        toast.error(`Error: ${err.response.data.detail || "Failed to submit review!"}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
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
      <RestaurentBannerDiv image={restaurant.image}>
        <h1>{restaurant.name}</h1>
        <h2>{restaurant.category.name}</h2>
        <StarRating rating={restaurant.average_rating} />
        <h3>{restaurant.description || "No description available but you should try the restaurant!!!"}</h3>
        <h3>{`Address: ${restaurant.street}, ${restaurant.city}, ${restaurant.zip}, ${restaurant.country}`}</h3>
      </RestaurentBannerDiv>

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
          <span style={{ marginLeft: "10px", fontSize: "18px", color: "rgba(126, 126, 126, 1)" }}>
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

        <SubmitButton onClick={handleSubmit}>SUBMIT</SubmitButton>
      </MainPage>

      <ToastStyles />
    </Container>
  );
};

export default NewReview;
