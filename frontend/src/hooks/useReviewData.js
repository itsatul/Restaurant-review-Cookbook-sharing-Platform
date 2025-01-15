import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewData } from '../slice/reviewSlice.js';

export const useReviewData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review.data);
  const status = useSelector((state) => state.review.status);
  const error = useSelector((state) => state.review.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReviewData());
    }
  }, [status, dispatch]);

  return { data, status, error };
};