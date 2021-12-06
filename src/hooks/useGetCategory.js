import { getCategoryAsync } from 'features/categorySlice';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

export const useGetCategory = () => {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    (async () => {
      const getCategoryAction = await dispatch(getCategoryAsync());
      const { results } = unwrapResult(getCategoryAction);
      setCategoryData(results);
    })();
  }, []);
  return {
    categoryData,
  };
};
