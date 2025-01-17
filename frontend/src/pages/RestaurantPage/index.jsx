import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../axios/axios.js";
import styled from "styled-components";
import RestaurantReviewCard from "../../components/RestaurantReviewCard";
import clockImage from "../../assets/clock.svg";
import moneyImage from "../../assets/money.svg";
import StarRating from "../../components/StarRating/index.jsx";
import RestaurantPrice from "../../components/RestaurantPrice/index.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const Banner = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const RestaurentBannerDiv = styled.div`
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

const ContectContainerDiv = styled.div`
  display: flex;
  padding: 1rem 5rem;
  gap: 1rem;
`;

const RestaurantDetailsDiv = styled.div`
  padding: 2rem 2rem;
  flex-grow: 1;
  width: 30%;
  background-color: #f5f5f5;
`;

const TimeDiv = styled.div`
  padding: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: bold;
`;

const MoneyDiv = styled(TimeDiv)``;

const RestaurantDetailsButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const RestaurantDetailsButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

const ReviewSection = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 1rem 5rem;
  background-color: #fff;
  border-radius: 8px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 10px;

    input {
        flex-grow: 1;
        width: 70%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    button {
        padding: 10px 20px;
        background-color: orange;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: darkorange;
        }
    }
`;

function RestaurantPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantData();
    fetchReviews();
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/restaurant/${id}`);
      setReviews(response.data);
      setFilteredReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSearch = () => {
    const filtered = reviews.filter((review) =>
      review.text_content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading || !restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Banner image={restaurant.image}>
        <RestaurentBannerDiv>
          <h1>{restaurant.name}</h1>
          <h2>{restaurant.category.name}</h2>
          <StarRating rating={restaurant.average_rating} />
          <h3>
            {restaurant.description || "No description available, but try it!"}
          </h3>
          <h3>
            {`Address: ${restaurant.street}, ${restaurant.city}, ${restaurant.zip}, ${restaurant.country}`}
          </h3>
        </RestaurentBannerDiv>
      </Banner>
      <ContectContainerDiv>
        <ReviewSection>
          <FilterContainer>
            <input
              type="text"
              placeholder="Filter reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Trigger search on "Enter" key
            />
            <button onClick={handleSearch}>Filter</button>
          </FilterContainer>
          {filteredReviews.map((review) => (
            <RestaurantReviewCard key={review.id} review={review} />
          ))}
        </ReviewSection>
        <RestaurantDetailsDiv>
          <TimeDiv>
            <img src={clockImage} alt="Opening hours" />
            <p>{restaurant.opening_hours}</p>
          </TimeDiv>
          <MoneyDiv>
            <img src={moneyImage} alt="Price level" />
            <RestaurantPrice priceLevel={restaurant.price_level} />
          </MoneyDiv>
          <RestaurantDetailsButtonContainer>
            <RestaurantDetailsButton onClick={() => navigate(`/new-review/${id}`)}>
              WRITE A REVIEW
            </RestaurantDetailsButton>
            <RestaurantDetailsButton onClick={() => navigate("#")}>
              EDIT DATA
            </RestaurantDetailsButton>
          </RestaurantDetailsButtonContainer>
        </RestaurantDetailsDiv>
      </ContectContainerDiv>
    </Container>
  );
}

export default RestaurantPage;
