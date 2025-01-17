import styled from "styled-components";
import StarRating from "../StarRating/index.jsx";
import {useUserRestaurants} from "../../hooks/useUserRestaurants.js";
import {useNavigate} from "react-router-dom";

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

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;

    button {
        width: 27%;
        min-width: 210px;
        height: 50px;
        background-color: #E47D31;
        color: #FFFFFF;
        border: none;
        border-radius: 25px;
        padding: 12px 20px;
        font-size: 20px;
        font-weight: 400;
        cursor: pointer;
        transition: transform 0.2s, background-color 0.3s, box-shadow 0.3s;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    button:hover {
        background-color: #e55d00;
        transform: translateY(-2px); /* slight lift */
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* stronger shadow on hover */
    }

    button:active {
        background-color: #cc5200; /* darker orange on click */
        transform: translateY(1px); /* push down effect */
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* smaller shadow on click */
    }

`

const RestaurantDescription = styled.div`
    p{
        font-size: 16px;
        font-weight: 300;
        color: #303030;
    }

`

export default function ProfileRestaurantCard({userId, activeNav}) {
    const navigate = useNavigate()
    const {
        data: userRestaurantData,
        status: userRestaurantStatus,
        error: userRestaurantError
    } = useUserRestaurants(userId, activeNav)
    if (userRestaurantStatus === "loading") {
        return <p>Loading reviews...</p>;
    }

    if (userRestaurantStatus === "error") {
        return <p>Error loading reviews: {userRestaurantError.message}</p>;
    }

    if (!userRestaurantData || userRestaurantData.length === 0) {
        return <p>No reviews found for this user.</p>;
    }

    return (
        <>
            {userRestaurantData.map((restaurant) => (
                <ReviewCardDiv key={restaurant.id}>
                    <p className={'restaurant-title'}>{restaurant.name}</p>
                    <StarRating rating={restaurant.average_rating}></StarRating>
                    <RestaurantDescription><p>{restaurant.description}</p></RestaurantDescription>
                </ReviewCardDiv>
            ))}
            <ButtonDiv>
                <button onClick={()=>navigate("/create-restaurant")}>Create Restaurant</button>
            </ButtonDiv>
        </>
    )
}