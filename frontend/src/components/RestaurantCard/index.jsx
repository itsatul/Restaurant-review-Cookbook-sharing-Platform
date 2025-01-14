import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRestaurantData} from "../../slice/restaurantSlice.js";

const RestaurantCardDiv = styled.div`
    //width: 20vw;
    max-width: 270px;
    height: 45vh;
    border: 1px solid #EBEBEB;
    border-top: 5px solid #E47D31;

    .productImage {
        width: 100%;
        height: 80%;
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
                        <div>{item.id}</div>
                        <div>{item.title}</div>
                        <div>{item.stock}</div>
                        <img className="productImage" src={item.images[0]}/>

                    </RestaurantCardDiv>
                )
            })}
        </>

    )
}