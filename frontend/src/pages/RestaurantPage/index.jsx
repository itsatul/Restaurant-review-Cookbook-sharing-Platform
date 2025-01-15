import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {api} from "../../axios/axios.js";

function RestaurantPage() {
    const {id} = useParams(); // Extract restaurant ID from the URL
    const [restaurant, setRestaurant] = useState(null); // State to store restaurant data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        fetchRestaurant();
    }, [id]);

    const fetchRestaurant = async () => {
        try {
            // const config = {
            //     headers: {
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            //     }
            // };
            // const response = await api.get(`/restaurants/${id}`, config); // Fetch data from the API
            const response = await api.get(`/restaurants/${id}`); // Fetch data from the API
            const data = response.data;
            console.log(data)
            // const data = {
            //     "id": 2,
            //     "category": null,
            //     "user": {
            //         "id": 4,
            //         "username": "atul",
            //         "email": "atul@admin.com"
            //     },
            //     "name": "Atul restaurant 1",
            //     "country": "India",
            //     "street": "Restaurant street",
            //     "city": "Lucknow",
            //     "zip": "226016",
            //     "website": "http://www.atulrestaurant.com",
            //     "phone": "0987654321",
            //     "email": "atul@restaurant.com",
            //     "opening_hours": "Sunday-Saturday 9:00AM-11PM",
            //     "price_level": "3",
            //     "image": "/media-files/restaurant_images/restaurant-1837150_1280.jpg"
            // }

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

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p>Address: {restaurant.address}</p>
            {/* Add more fields as per the API response */}
        </div>
    );
}

export default RestaurantPage;
