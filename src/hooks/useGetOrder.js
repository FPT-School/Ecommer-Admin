import { unwrapResult } from '@reduxjs/toolkit';
import { LIMIT } from 'config';
import { getOrderAsync } from 'features/orderSlice';
import { isEmpty, keyBy } from 'lodash';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

export const useGetOrder = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [orderData, setOrderData] = useState([]);
  const [total, setTotal] = useState(0);
  const search = qs.parse(location.search);

  const page = isEmpty(search) ? 1 : search.page;

  useEffect(() => {
    (async () => {
      try {
        const action = await dispatch(
          getOrderAsync({ page: +page, limit: LIMIT, populate: 'userId,orderItemId' })
        );
        const { totalResults, results } = unwrapResult(action);
        setTotal(totalResults);
        setOrderData(keyBy(results, 'id'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location, page]);

  return {
    page,
    total,
    isLoading,
    orderData,
    setOrderData,
  };
};
