import { unwrapResult } from '@reduxjs/toolkit';
import { getColorAsync } from 'features/colorSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useGetColor = () => {
  const dispatch = useDispatch();

  const [colorData, setColorData] = useState([]);

  useEffect(() => {
    (async () => {
      const action = await dispatch(getColorAsync());
      const { results } = unwrapResult(action);
      setColorData(results);
    })();
  }, []);
  return {
    colorData,
  };
};
