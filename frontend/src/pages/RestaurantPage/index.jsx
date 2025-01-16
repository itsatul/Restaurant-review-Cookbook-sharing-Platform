import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {api} from "../../axios/axios.js";
import styled from "styled-components";
import StarRating from "../../components/StarRating/index.jsx";
import clockImage from "../../assets/clock.svg";
import moneyImage from "../../assets/money.svg";
import RestaurantPrice from "../../components/RestaurantPrice/index.jsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #F5F5F5;
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

    h1, h2, h3, h4, h5, h6 {
        color: white;
    }
`;
const ContectContainerDiv = styled.div`
    display: flex;
    background-color: black;
    padding: 1rem 5rem;
    gap: 1rem;
`
const RestaurantDetailsDiv = styled.div`
    flex-grow: 1;
    width: 30%;
    height: 100px;
    background-color: #F5F5F5;
`
const TimeDiv = styled.div`
    padding: 5px;
    display: flex;
    gap: 10px;
    align-items: center;
`
const MoneyDiv = styled(TimeDiv)`
    /* Add any additional or overridden styles here */
`
const RestaurantDetailsButtonContainer = styled(TimeDiv)`
    /* Add any additional or overridden styles here */
    justify-content: space-between;
`
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
`
const ReviewDiv = styled.div`
    width: 70%;
    height: fit-content;
    flex-grow: 1;
    background-color: aqua;
`

function RestaurantPage() {
    const navigate = useNavigate();
    const {id} = useParams(); // Extract restaurant ID from the URL
    const [restaurant, setRestaurant] = useState(null); // State to store restaurant data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        fetchRestaurantPageData();
    }, [id]);

    const fetchRestaurantPageData = async () => {
        try {

            const response = await api.get(`/restaurants/${id}`); // Fetch data from the API
            const data = response.data;
            console.log(data)

            setRestaurant(data);
        } catch (err) {
            setError('Failed to load restaurant data'); // Handle errors
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (<Container>
            <Banner image={restaurant.image}>
                <RestaurentBannerDiv>
                    <h1>{restaurant.name}</h1>
                    <h2>{restaurant.category.name}</h2>
                    <StarRating rating={restaurant.average_rating}/>
                    <h3>{restaurant.description || 'No description available but you should try the restaurant!!!'}</h3>
                    <h3>{`Address: ${restaurant.street}, ${restaurant.city}, ${restaurant.zip}, ${restaurant.country}`}</h3>
                </RestaurentBannerDiv>
            </Banner>
            <ContectContainerDiv>
                <ReviewDiv>
                    <h1>Reviews</h1>
                </ReviewDiv>
                <RestaurantDetailsDiv>
                    <TimeDiv>
                        <img src={clockImage}/>
                        <p>{restaurant.opening_hours}</p>
                    </TimeDiv>
                    <MoneyDiv>
                        <img src={moneyImage}/>
                        <RestaurantPrice priceLevel={restaurant.price_level}/>
                    </MoneyDiv>
                    <RestaurantDetailsButtonContainer>
                        <RestaurantDetailsButton onClick={() => navigate(`/new-review/${id}`)}>WRITE A
                            REVIEW</RestaurantDetailsButton>
                        <RestaurantDetailsButton onClick={() => navigate('#')}>EDIT DATA</RestaurantDetailsButton>
                    </RestaurantDetailsButtonContainer>

                </RestaurantDetailsDiv>
            </ContectContainerDiv>

        </Container>


    );
}

export default RestaurantPage;
