import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRestaurantsByUser} from '../slice/restaurantSlice.js';

export const useUserRestaurants = (userId, activeNav) => {
    const dispatch = useDispatch();
    // access reviews by user including fallback with empty object
    const restaurantsByUser = useSelector((state) => state.restaurant.restaurantsByUser || {});
    const data = restaurantsByUser[userId]
    const status = useSelector((state) => state.review.status);
    const error = useSelector((state) => state.review.error);
    useEffect(() => {
        if (!data && !error && userId) {
            dispatch(fetchRestaurantsByUser(userId));
        }
    }, [data, status, userId, dispatch, activeNav]);

    return {data, status, error};
};