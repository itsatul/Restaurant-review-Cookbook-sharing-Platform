import styled from "styled-components";
import SearchBarSearch from "../../components/SearchBarSearch/index.jsx";
import RestaurantCard from "../../components/RestaurantCard/index.jsx";
import ReviewCard from "../../components/ReviewCard/index.jsx";
import {useState} from "react";
import {useRestaurantData} from "../../hooks/useRestaurantData.js";
import {useReviewData} from "../../hooks/useReviewData.js";

const SearchPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F5F5F5;
`

const SearchNaviContainer = styled.div`
    width: 100%;
    height: 25px;
    margin-bottom: 2rem;

    nav {
        height: 100%;
    }

    ul {
        height: 100%;
        list-style: none;
        display: grid;
        grid-gap: 2rem;
        justify-content: center;
        //grid-template-columns: repeat(3, 1fr);
        grid-template-columns: repeat(3, calc(33.33% - 240px));
        margin: 0;
    }

    li {
        margin-top: 0;
        text-align: center;
    }

`

const CardContainer = styled.div`
    width: 85%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5rem;
`

export default function SearchPage() {

    // use custom hooks to fetch relevant data
    const {data: restaurantData, status: restaurantStatus, error: restaurantError} = useRestaurantData()
    const {data: reviewData, status: reviewStatus, error: reviewError} = useReviewData()

    // managing state of active navigation point
    const NAVI_ITEMS = {
        RESTAURANTS: 'RESTAURANTS',
        REVIEWS: 'REVIEWS',
        USERS: 'USERS',
    }
    const [activeNavi, setActiveNavi] = useState(NAVI_ITEMS.RESTAURANTS);
    console.log('Active Navi:', activeNavi);

    // returning according content dependent on chosen navigation
    const getContent = () => {
        if (activeNavi === 'RESTAURANTS') {
            console.log('restaurants active')
            return (
                <>
                    {/*error handling included here to avoid early returns which would lead to rendering issues*/}
                    {restaurantStatus === 'loading' && <div>Loading...</div>}
                    {restaurantStatus === 'failed' && <div>Error: {restaurantError}</div>}
                    {restaurantStatus === 'succeeded' && Array.isArray(restaurantData) && restaurantData.length > 0 ? (
                        restaurantData.map((item) => (
                            <RestaurantCard key={item.id} restaurant={item}/>
                        ))
                    ) : (
                        restaurantStatus === 'succeeded' && <div>No restaurants found.</div>
                    )}
                </>
            )
        } else if (activeNavi === 'REVIEWS') {
            return (
                <>
                    {reviewStatus === 'loading' && <div>Loading...</div>}
                    {reviewStatus === 'failed' && <div>Error: {reviewError}</div>}
                    {reviewStatus === 'succeeded' && Array.isArray(reviewData) && reviewData.length > 0 ? (
                        reviewData.map((item) => (
                            <ReviewCard key={item.id} review={item}/>
                        ))
                    ) : (
                        reviewStatus === 'succeeded' && <div>No reviews found.</div>
                    )}
                </>
            )
        }
    }

    return (
        <SearchPageContainer>
            <SearchBarSearch/>
            <SearchNaviContainer>
                <nav>
                    <ul>
                        <li onClick={() => setActiveNavi('RESTAURANTS')}>RESTAURANTS</li>
                        <li onClick={() => setActiveNavi('REVIEWS')}>REVIEWS</li>
                        <li onClick={() => setActiveNavi('USERS')}>USERS</li>
                    </ul>
                </nav>
            </SearchNaviContainer>

            <CardContainer>
                {getContent()}
            </CardContainer>
        </SearchPageContainer>
    )

}
