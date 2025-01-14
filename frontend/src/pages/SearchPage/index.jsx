import styled from "styled-components";
import SearchBarSearch from "../../components/SearchBarSearch/index.jsx";
import RestaurantCard from "../../components/RestaurantCard/index.jsx";
import {useState} from "react";
import StarRating from "../../components/StarRating/index.jsx";
import ReviewCard from "../../components/ReviewCard/index.jsx";

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

    // managing state of active navigation point
    const [activeNavi, setactiveNavi] = useState('RESTAURANTS');

    const getContent = () => {
        if (activeNavi === 'RESTAURANTS') {
            return <RestaurantCard/>
        }
        else if (activeNavi === 'REVIEWS') {
            return <ReviewCard/>
        }
    }

    return (
        <SearchPageContainer>
            <SearchBarSearch/>
            <SearchNaviContainer>
                <nav>
                    <ul>
                        <li onClick={() => setactiveNavi('RESTAURANTS')}>RESTAURANTS</li>
                        <li onClick={() => setactiveNavi('REVIEWS')}>REVIEWS</li>
                        <li onClick={() => setactiveNavi('USERS')}>USERS</li>
                    </ul>
                </nav>
            </SearchNaviContainer>

            <CardContainer>
                {getContent()}
            </CardContainer>
        </SearchPageContainer>
    )

}