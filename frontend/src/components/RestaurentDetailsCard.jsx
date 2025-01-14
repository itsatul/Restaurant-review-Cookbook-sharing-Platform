import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 10px;

  h3 {
    margin: 5px 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0;
    color: gray;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
    font-size: 14px;
    color: gray;
  }
`;

function RestaurantDetailsCard({ name, address, image, rating, votes }) {
  return (
    <Card>
      <Image src={image} alt={name} />
      <Content>
        <h3>{name}</h3>
        <p>{address}</p>
        <Rating>
          <div>⭐ {rating}</div>
          <span>({votes})</span>
        </Rating>
      </Content>
    </Card>
  );
}

export default RestaurantDetailsCard;
