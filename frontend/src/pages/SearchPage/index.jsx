import styled from "styled-components";
import SearchBarSearch from "../../components/SearchBarSearch/index.jsx";
import RestaurantCard from "../../components/RestaurantCard/index.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestaurantData} from "../../slice/restaurantSlice.js";

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

    // fetching of data
    const dispatch = useDispatch()
    const data = useSelector((state) => state.restaurant.data);
    const status = useSelector((state) => state.restaurant.status);
    const error = useSelector((state) => state.restaurant.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRestaurantData());
        }
    }, [status, dispatch]);

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
                    {status === 'loading' && <div>Loading...</div>}
                    {status === 'failed' && <div>Error: {error}</div>}
                    {status === 'succeeded' && Array.isArray(data) && data.length > 0 ? (
                        data.map((item) => (
                            <RestaurantCard key={item.id} restaurant={item}/>
                        ))
                    ) : (
                        status === 'succeeded' && <div>No restaurants found.</div>
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