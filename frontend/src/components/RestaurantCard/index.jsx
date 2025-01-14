import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRestaurantData} from "../../slice/restaurantSlice.js";
import StarRating from "../StarRating/index.jsx";

const RestaurantCardDiv = styled.div`
    //width: 20vw;
    max-width: 270px;
    min-width: 250px;
    height: 45vh;
    border: 1px solid #EBEBEB;
    border-top: 8px solid #E47D31;
    background: #FFFFFF;
    padding-inline: 1rem;
    padding-top: 1rem;

    .restaurant-image {
        width: 100%;
        height: 80%;
        overflow: hidden;
    }

`

export default function RestaurantCard() {

    const dispatch = useDispatch()
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

    return (
        <>
            {data.map((item) => {
                return (
                    // adding restaurant data (name, address, rating, rating count, image) to restaurant card
                    <RestaurantCardDiv key={item.id}>
                        <div className={'restaurant-title'}>{item.id}</div>
                        <div className={'restaurant-address'}>{item.title}</div>
                        <StarRating rating={item.rating}/>
                        <img className="restaurant-image" src={item.images[0]}/>

                    </RestaurantCardDiv>
                )
            })}
        </>

    )
}