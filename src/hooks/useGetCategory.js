import { unwrapResult } from '@reduxjs/toolkit';
import { getCategoryAsync } from 'features/categorySlice';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get, isEmpty, keyBy } from 'lodash';

import { useLocation } from 'react-router-dom';
export const useGetCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const search = qs.parse(location.search);
  const page = isEmpty(search) ? 1 : search.page;

  useEffect(() => {
    (async () => {
      try {
        const getCategoryAction = await dispatch(getCategoryAsync({ page }));
        const { totalResults, results } = unwrapResult(getCategoryAction);
        setCategoryData(keyBy(results, 'id'));
        setTotal(totalResults);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, location]);

  return {
    total,
    page,
    total,
    isLoading,
    categoryData,
    setCategoryData,
  };
};
