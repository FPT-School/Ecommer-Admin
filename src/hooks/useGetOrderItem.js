import { unwrapResult } from '@reduxjs/toolkit';
import { LIMIT } from 'config';
import { getOrderAsync, deleteAsync } from 'features/orderItem';
import { isEmpty, keyBy } from 'lodash';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

export const useGetOrderItem = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [orderItemData, setOrderItemData] = useState([]);
  const [total, setTotal] = useState(0);
  const search = qs.parse(location.search);

  const page = isEmpty(search) ? 1 : search.page;

  useEffect(() => {
    (async () => {
      try {
        const action = await dispatch(
          getOrderAsync({ page: +page, limit: LIMIT })
        );
        const { totalResults, results } = unwrapResult(action);
        setTotal(totalResults);
        setOrderItemData(keyBy(results, 'id'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location, page]);

  return {
    page,
    total,
    isLoading,
    orderItemData,
    setOrderItemData,
  };
};

export const deleteOrder = async (dispatch, id) => {
  try {
    const action = await dispatch(deleteAsync(id));
    // const { totalResults, results } = unwrapResult(action);
    toast.success('Xóa thành công');
  } catch (error) {
    toast.error('Xóa thất bại! Có lỗi xảy ra');
  }
};
