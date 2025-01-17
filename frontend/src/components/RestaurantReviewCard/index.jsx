import styled from "styled-components";
import StarRating from "../../components/StarRating";

const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;

  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
    color: orange;
    padding-bottom: 2px;
  }

  small {
    color: gray;
    font-size: 0.85rem;
    font-weight: bold;
  }
`;

const RatingAndDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .rating {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  small {
    color: gray;
    font-size: 0.85rem;
    font-weight: bold;
  }
`;

const ReviewText = styled.p`
  margin: 10px 0;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button {
    background: transparent;
    border: none;
    color: orange;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function RestaurantReviewCard({ review }) {
  const {
    user: { username, review_count, profile_picture },
    text_content,
    rating,
    created_at,
    like_count,
    comment_count,
  } = review;

  return (
    <ReviewCardContainer>
      <Header>
        <ProfilePicture
          src={
            profile_picture || "https://via.placeholder.com/50?text=No+Image"
          }
          alt={`${username}'s profile`}
        />
        <UserInfo>
          <h4>{username}</h4>
          <small>{review_count} Reviews in total</small>
        </UserInfo>
        <RatingAndDate>
          <div className="rating">
            <StarRating rating={rating} />
          </div>
          <small>{created_at}</small>
        </RatingAndDate>
      </Header>
      <ReviewText>{text_content}</ReviewText>
      <Actions>
        <button>{`Like ${like_count}`}</button>
        <button>{`Comment ${comment_count}`}</button>
        <button>View all comments</button>
      </Actions>
    </ReviewCardContainer>
  );
}

export default RestaurantReviewCard;
