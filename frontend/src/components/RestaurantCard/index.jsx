import styled from "styled-components";
import StarRating from "../StarRating/index.jsx";
import {useNavigate} from "react-router-dom";

const RestaurantCardDiv = styled.div`
    //width: 20vw;
    max-width: 270px;
    min-width: 250px;
    height: 50vh;
    border: 1px solid #EBEBEB;
    border-top: 8px solid #E47D31;
    background: #FFFFFF;
    padding-inline: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
    gap: 1rem;

    .restaurant-image {
        width: 100%;
        height: 60%;
        overflow: hidden;
    }

`

export default function RestaurantCard({restaurant}) {
    const navigate = useNavigate();
    if (!restaurant) {
        return <div>No restaurant</div>
    }

    return (
        // adding restaurant data (name, address, rating, rating count, image) to restaurant card
        <RestaurantCardDiv key={restaurant.id} onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
            <div className={'restaurant-title'}>{restaurant.name}</div>
            <div
                className={'restaurant-address'}>{`${restaurant.street}, ${restaurant.city}, ${restaurant.zip}, ${restaurant.country}`}</div>
            <StarRating rating={restaurant.average_rating}/>
            {restaurant.image ? (
                <img
                    className="restaurant-image"
                    src={`https://luna-project-batch30.propulsion-learn.ch${restaurant.image}`}
                    alt="Restaurant"
                />
            ) : (
                <div className="no-image-placeholder">No Image</div>
            )}

            {/*{*/}
            {/*    restaurant.images && restaurant.images[0] && (*/}
            {/*        <img className="restaurant-image" src={restaurant.images[0]} alt="Restaurant"/>*/}
            {/*    )*/}
            {/*}*/}
        </RestaurantCardDiv>

    )
}
