import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReviewData} from "../../slice/reviewSlice.js";
import LikeButton from "../LikeButton/index.jsx";
import CommentButton from "../CommentButton/index.jsx";


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
    
    .review-title {
        font-size: 18px;
        font-weight: 700;
        color: #E47D31;
        
        padding-left: 1rem;
    }

    .review-body {
        display: -webkit-box; // flex-like layout for text
        -webkit-box-orient: vertical; /* Sets orientation to vertical */
        overflow: hidden; /* Ensures text overflow is hidden */
        text-overflow: ellipsis; /* Adds the ellipsis (...) */
        line-clamp: 3; /* Limits text to 3 lines */
        max-height: 4.5em; /* Adjust based on your line height (e.g., 1.5em per line) */
        line-height: 1.5em; /* Ensures consistent spacing between lines */
        padding-left: 0.5rem;
    }
`

const ButtonDiv = styled.div`
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1px;
`

const ReviewCardBottom = styled.div`
    border: 1px solid darkorchid;
    height: 25%;

`

export default function ReviewCard() {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.review.data);
    const status = useSelector((state) => state.review.status);
    const error = useSelector((state) => state.review.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReviewData());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    // const test_data = {
    //     reviews: [{
    //         id: 1,
    //         title: 'Best Sushi in Town.',
    //         body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    //         likes: 11,
    //         comments: 4,
    //         restaurant: {
    //             id: 55,
    //             name: 'chez tiara',
    //         },
    //         user: {
    //             username: 'pablo',
    //             total_reviews: 10,
    //         }
    //     }]
    // };

    console.log('review data', data)

    return (
        <>
            {data.map((item) => {
                return (
                    // adding review data (username, review count, review title, review body, like count) to review card
                    <ReviewCardDiv key={item.id}>
                        <ReviewCardTop>
                            <div className={'profile-image'}>profile image</div>
                            <div className={'user-name'}><p>{item.userId} username</p><p>{item.userId} Reviews in
                                total</p></div>
                        </ReviewCardTop>
                        <ReviewCardMiddle>
                            <div className={'review-title'}>{item.title}</div>
                            <div className={'review-body'}>{item.body}</div>
                        </ReviewCardMiddle>
                        <ButtonDiv>
                            <LikeButton/>
                            <CommentButton/>
                        </ButtonDiv>
                        <ReviewCardBottom></ReviewCardBottom>
                    </ReviewCardDiv>
                )
            })}
        </>

    )
}