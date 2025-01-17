import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUserData} from "../slice/userSlice.js";

export const useUserData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.data);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData());
    }
  }, [status, dispatch]);

  return { data, status, error };
};