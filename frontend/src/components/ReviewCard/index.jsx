import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRestaurantData} from "../../slice/restaurantSlice.js";


const ReviewCardDiv = styled.div`
    //width: 20vw;
    max-width: 270px;
    min-width: 250px;
    height: 45vh;
    border: 1px solid #EBEBEB;
    border-top: 8px solid #E47D31;
    background: #FFFFFF;

    display: flex;
    flex-direction: column;


    .restaurant-image {
        width: 100%;
        height: 80%;
        overflow: hidden;
    }
`

const ReviewCardTop = styled.div`
    border: 1px solid blueviolet;
    width: 100%;
    height: 20%;

    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1 fr 1fr;
`

const ReviewCardMiddle = styled.div`
    border: 1px solid darkslategrey;
    width: 100%;
    height: 40%;

    .review-body {
        display: -webkit-box; /* Enables flex-like layout for text */
        -webkit-box-orient: vertical; /* Sets orientation to vertical */
        overflow: hidden; /* Ensures text overflow is hidden */
        text-overflow: ellipsis; /* Adds the ellipsis (...) */
        line-clamp: 3; /* Limits text to 3 lines */
        max-height: 4.5em; /* Adjust based on your line height (e.g., 1.5em per line) */
        line-height: 1.5em; /* Ensures consistent spacing between lines */
    }
`

export default function ReviewCard() {

    const mo_data = mo_data.json

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

    const test_data = {
        reviews: [{
            id: 1,
            title: 'Best Sushi in Town.',
            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            likes: 11,
            comments: 4,
            restaurant: {
                id: 55,
                name: 'chez tiara',
            },
            user: {
                username: 'pablo',
                total_reviews: 10,
            }
        }]
    };


    return (
        <>
            {test_data.reviews.map((item) => {
                return (
                    // adding restaurant data (name, address, rating, rating count, image) to restaurant card
                    <ReviewCardDiv key={item.id}>
                        <ReviewCardTop>
                            <div className={'profile-image'}>profile image</div>
                            <div className={'user-name'}><p>{item.user.username}</p><p>{item.user.total_reviews} Reviews in total</p></div>
                        </ReviewCardTop>
                        <ReviewCardMiddle>
                            <div className={'restaurant-title'}>{item.restaurant.name}</div>
                            <div className={'review-body'}>{item.body}</div>
                        </ReviewCardMiddle>
                    </ReviewCardDiv>
                )
            })}
        </>

    )
}