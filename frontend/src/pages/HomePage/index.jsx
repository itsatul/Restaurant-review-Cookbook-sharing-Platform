import React, {useEffect, useState} from "react";
import styled from "styled-components";
import bannerImage from "../../assets/Luna_banner.jpg";
import RestaurantDetailsCard from "../../components/RestaurentDetailsCard.jsx";
import {useLocation} from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #F5F5F5;
`;

const Banner = styled.div`
    background-image: url(${bannerImage});
    background-size: cover;
    background-position: center;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchBarContainer = styled.div`
    display: flex;
    margin: 20px auto;
    max-width: 500px;

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px 0 0 5px;
        background-color: aliceblue;
    }

    button {
        padding: 10px 20px;
        background-color: orange;
        color: white;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;

        &:hover {
            background-color: darkorange;
        }
    }
`;

const RestaurantList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;
    gap: 20px;
`;

const Message = styled.p`
    text-align: center;
    font-size: 16px;
    color: #666;
`;

function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [defaultRestaurants, setDefaultRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            fetchBestRatedRestaurants();
        }
    }, [location]);

    // Fetch default best-rated restaurants on mount
    useEffect(() => {
        fetchBestRatedRestaurants();
    }, []);

    const fetchBestRatedRestaurants = async () => {

        setLoading(true);
        setError("");
        try {
            // const response = await api.get('/home'); Uncomment when endpoint works
            // const data = response.data.results;
            const data = [
                {"id": 1, "name": "The Food Palace", "address": "123 Main St"},
                {"id": 2, "name": "Pasta Heaven", "address": "456 Side St"},
                {"id": 3, "name": "Burger World", "address": "789 King St"},
                {"id": 4, "name": "Sushi Central", "address": "101 Ocean Ave"}
            ]

            setRestaurants(data);
            setDefaultRestaurants(data);
        } catch (error) {
            setError("Error fetching best-rated restaurants.");
        } finally {
            setLoading(false);
            console.log('line90', loading)
        }
    };

    const handleSearch = () => {
        setSearchTerm(""); // Clear search input
        if (!searchTerm) {
            setRestaurants(defaultRestaurants);
            return;
        }
        fetchSearchResults(searchTerm);
    };

    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError("");
        try {
            // const response = await api.get('restaurants?search=${query}'); //Uncomment when endpoint works
            // const data = response.data.results;
            // const data = []; //mimick no search results found
            const data = [ //mimick some search reasults found
                {"id": 3, "name": "Burger World", "address": "789 King St"},
                {"id": 4, "name": "Sushi Central", "address": "101 Ocean Ave"}
            ]
            if (data.length === 0) {
                setError("No data found.");
            } else {
                setRestaurants(data);
            }
        } catch (error) {
            setError("Error fetching search results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Banner>
                <SearchBarContainer>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                    />
                    <button onClick={handleSearch}>Search</button>
                </SearchBarContainer>
            </Banner>
            <h2 style={{textAlign: "center", margin: "20px 0"}}>BEST RATED RESTAURANTS</h2>
            <RestaurantList>
                {loading ? (
                    <Message>Loading...</Message>
                ) : error ? (
                    <Message>{error}</Message>
                ) : restaurants.length === 0 ? (
                    <Message>No data found.</Message>
                ) : (
                    restaurants.map((restaurant) => (
                        <RestaurantDetailsCard
                            key={restaurant.id}
                            name={restaurant.name}
                            address={restaurant.address}
                        />
                    ))
                )}
            </RestaurantList>
        </Container>
    );
}

export default HomePage;
