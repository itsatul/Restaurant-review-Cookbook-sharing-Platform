import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {api} from "../../axios/axios.js";
import styled from "styled-components";
import StarRating from "../../components/StarRating/index.jsx";

function RestaurantPage() {

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
        background-color: rgba(19, 18, 18, 0.15); /* Example background */


        /* Target all h tags inside BannerDiv */

        h1, h2, h3, h4, h5, h6 {
            color: white; /* Change this to your desired color */
        }
    `;
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
        return <p>Loading...</p>; // Display loading state
    }

    if (error) {
        return <p>{error}</p>; // Display error state
    }

    return (<Container>
            <Banner image={restaurant.image}>
                <RestaurentBannerDiv>
                    <h1>{restaurant.name}</h1>
                    <h2>{restaurant.category.name}</h2>
                    <StarRating rating={restaurant.average_rating}/>
                    <h3>{restaurant.description || 'No description available but you should try the restaurant!!!'}</h3>
                    <h3>{`Address: ${restaurant.street}, ${restaurant.city}, ${restaurant.zip}, ${restaurant.country}`}</h3>
                    {/* Add more fields as per the API response */}
                </RestaurentBannerDiv>

            </Banner>

        </Container>


    );
}

export default RestaurantPage;
