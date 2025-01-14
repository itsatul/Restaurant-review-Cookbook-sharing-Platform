import React from "react";
import styled from "styled-components";
import bannerImage from "../../assets/Luna_banner.jpg"
import RestaurantDetailsCard from "../../components/RestaurentDetailsCard.jsx";

const Container = styled.div`
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

const SearchBar = styled.div`
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
`;

function HomePage() {
  const restaurants = [
    {
      name: "Restaurant 1",
      address: "Address 1",
      image: "/path-to-image1.jpg",
      rating: 4.5,
      votes: 100,
    },
    {
      name: "Restaurant 2",
      address: "Address 2",
      image: "/path-to-image2.jpg",
      rating: 4.0,
      votes: 80,
    },
    {
      name: "Restaurant 3",
      address: "Address 3",
      image: "/path-to-image3.jpg",
      rating: 3.5,
      votes: 50,
    },
    {
      name: "Restaurant 4",
      address: "Address 4",
      image: "/path-to-image4.jpg",
      rating: 5.0,
      votes: 120,
    },
  ];

  return (
    <Container>
      <Banner>
        <SearchBar>
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </SearchBar>
      </Banner>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        BEST RATED RESTAURANTS
      </h2>
      <RestaurantList>
        {restaurants.map((restaurant, index) => (
          <RestaurantDetailsCard key={index} {...restaurant} />
        ))}
      </RestaurantList>
    </Container>
  );
}

export default HomePage;
