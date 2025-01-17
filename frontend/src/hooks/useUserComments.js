import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCommentsByUser} from '../slice/reviewSlice.js';

export const useUserComments = (userId, activeNav) => {
    const dispatch = useDispatch();
    // access comments by user including fallback with empty object
    const commentsByUser = useSelector((state) => state.review.commentsByUser || {});
    const data = commentsByUser[userId]
    const status = useSelector((state) => state.review.status);
    const error = useSelector((state) => state.review.error);
    useEffect(() => {
        if (!data && !error && userId) {
            dispatch(fetchCommentsByUser(userId));
        }
    }, [data, status, dispatch, userId, activeNav]);

    return {data, status, error};
};