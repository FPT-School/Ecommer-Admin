import { unwrapResult } from '@reduxjs/toolkit';
import { LIMIT } from 'config';
import { getUserAsync } from 'features/userSlice';
import { isEmpty, keyBy } from 'lodash';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

export const useGetUser = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [total, setTotal] = useState(0);
  const search = qs.parse(location.search);
  
  const page = isEmpty(search) ? 1 : search.page;

  useEffect(() => {
    (async () => {
      try {
        const action = await dispatch(
          getUserAsync({ page: +page, limit: LIMIT , role: 'user'})
        );
        const { totalResults, results } = unwrapResult(action);
        setTotal(totalResults);
        setUserData(keyBy(results, 'id'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location, page]);

  return {
    page,
    total,
    isLoading,
    userData,
    setUserData,
  };
};
