import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRestaurantData} from '../slice/restaurantSlice';

export const useRestaurantData = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.restaurant.data);
    const status = useSelector((state) => state.restaurant.status);
    const error = useSelector((state) => state.restaurant.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRestaurantData());
        }
    }, [status, dispatch]);

    return {data, status, error};
};
