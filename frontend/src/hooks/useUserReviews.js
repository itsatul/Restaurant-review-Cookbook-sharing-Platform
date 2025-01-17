import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReviewsByUser} from '../slice/reviewSlice.js';

export const useUserReviews = (userId, activeNav) => {
    const dispatch = useDispatch();
    // access reviews by user including fallback with empty object
    const reviewsByUser = useSelector((state) => state.review.reviewsByUser || {});
    const data = reviewsByUser[userId]
    const status = useSelector((state) => state.review.status);
    const error = useSelector((state) => state.review.error);
    console.log('hook', activeNav)
    useEffect(() => {
        if (!data && status === 'idle' && userId) {
            dispatch(fetchReviewsByUser(userId));
        }
    }, [data, status, userId, dispatch, activeNav]);

    return {data, status, error};
};