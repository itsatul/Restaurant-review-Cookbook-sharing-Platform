import styled from "styled-components";
import StarRating from "../StarRating/index.jsx";
import {useNavigate} from "react-router-dom";

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
    cursor: pointer;

    .restaurant-image {
        width: 100%;
        height: 80%;
        overflow: hidden;
    }

`

export default function RestaurantCard({restaurant}) {
    const navigate = useNavigate();
    if (!restaurant) {
        return <div>No restaurant</div>
    }
    // const dispatch = useDispatch()
    // const data = useSelector((state) => state.restaurant.data);
    // const status = useSelector((state) => state.restaurant.status);
    // const error = useSelector((state) => state.restaurant.error);
    //
    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchRestaurantData());
    //     }
    // }, [status, dispatch]);
    //
    // if (status === 'loading') {
    //     return <div>Loading...</div>;
    // }
    //
    // if (status === 'failed') {
    //     return <div>Error: {error}</div>;
    // }

    // console.log('restaurant data', restaurant)

    return (
        // adding restaurant data (name, address, rating, rating count, image) to restaurant card
        <RestaurantCardDiv key={restaurant.id} onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
            <div className={'restaurant-title'}>{restaurant.name}</div>
            <div
                className={'restaurant-address'}>{`${restaurant.street}, ${restaurant.city}, ${restaurant.zip}, ${restaurant.country}`}</div>
            <StarRating rating={restaurant.rating}/>
            <img className="restaurant-image" src={restaurant.image} alt="Restaurant"/>

            {/*{*/}
            {/*    restaurant.images && restaurant.images[0] && (*/}
            {/*        <img className="restaurant-image" src={restaurant.images[0]} alt="Restaurant"/>*/}
            {/*    )*/}
            {/*}*/}
        </RestaurantCardDiv>

    )
}