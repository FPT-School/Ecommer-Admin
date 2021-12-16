import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Col,
  Image,
  Modal,
  Pagination,
  Row,
  Spin,
  Typography,
} from 'antd';
import { LIMIT } from 'config';
import { getByIdAsync } from 'features/orderItem';
import { useGetOrderItem, deleteOrder } from 'hooks/useGetOrderItem';
import { useGetOrder } from 'hooks/useGetOrder';
import { get, values } from 'lodash';
import 'pages/Auth/styles.scss';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { formatCurrency } from 'utils/formatCurrency';

const OrderList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentOrder, setCurrentOrder] = useState(null);
  

  const { page, total, isLoading: isFetchOrder, orderData } = useGetOrder();

  const onCloseModal = useCallback(() => {
    setIsShow(false);
  }, [isShow]);

  const onShowDetail = async (id) => {
    try {
      setIsLoading(true);
      const getByIdAction = await dispatch(getByIdAsync(id));
      const _data = unwrapResult(getByIdAction);
      setCurrentOrder(_data);
    } finally {
      setIsShow(true);
      setIsLoading(false);
    }
  };

  const handleChange = (page) => {
    history.push(`${match.url}?page=${page}`);
  };

  if (isFetchOrder) return <Spin />;
  return (
    <>
      <Modal
        width={1400}
        title={'Chi tiết order'}
        visible={isShow}
        onCancel={onCloseModal}
        footer={null}>
        <Row
          gutter={24}
          align="middle"
          justify="space-between"
          style={{
            background: '#FAFAFA',
            padding: 10,
          }}>
          <Col span={2}>STT</Col>
          <Col span={2}> Mã Sản phẩm</Col>
          <Col span={3}> Tên sản phẩm</Col>
          <Col span={4}> Giá tiền</Col>
          <Col span={3}> Giảm giá</Col>
          <Col span={4}> Hình ảnh</Col>
          {/* <Col span={6}> Tình trạng </Col> */}
        </Row>

        {get(currentOrder, 'product', []).map((product, idx) => {
          return (
            <Row
              key={product.id}
              gutter={24}
              align="middle"
              justify="space-between"
              style={{
                background: '#FAFAFA',
                padding: 10,
              }}>
              <Col span={2}>{idx + 1}</Col>
              <Col span={2}> {get(product, 'productId.productCode', '')}</Col>
              <Col span={3}> {get(product, 'productId.productName', '')}</Col>
              <Col span={4}>
                {formatCurrency(
                  (product.productId.price -
                    (product.productId.price * product.productId.discount) /
                      100) *
                    product.quantity,
                  'VND'
                )}
              </Col>
              <Col span={3}> {product.productId.discount} %</Col>
              <Col span={4}>
                <Image.PreviewGroup>
                  {get(product, 'productId.imageProductId.images', []).map(
                    (image, idx) => {
                      return (
                        <Image
                          key={idx}
                          src={image.path}
                          alt={image.index}
                          width={50}
                          height={50}
                        />
                      );
                    }
                  )}
                </Image.PreviewGroup>
              </Col>
              <Col span={6}>
                {/* {
                  { 0: 'Chưa giao hàng', 1: 'Đã giao hàng' }[
                    product.productId.status
                  ]
                } */}
              </Col>
            </Row>
          );
        })}

        <Row justify="end">
          <Typography.Title level={4}>
            {formatCurrency(get(currentOrder, 'unitPrice', ''), 'VND')}
          </Typography.Title>
        </Row>
      </Modal>

      <Row
        gutter={24}
        align="middle"
        justify="space-between"
        style={{
          background: '#FAFAFA',
          padding: 10,
        }}>
        <Col span={2}>STT</Col>
        <Col span={5}> Mã Order</Col>
        <Col span={5}> Số tiền</Col>
        <Col span={5}> Tình trạng</Col>
        <Col span={6}> Hành động khác</Col>
      </Row>

      {values(orderData).map((order, idx) => {
        console.log(orderData, 'orderdata')
        return (
          <Row
            key={order.id}
            gutter={24}
            align="middle"
            justify="space-between"
            style={{
              background: '#FAFAFA',
              padding: 10,
            }}>
            <Col span={2}>{idx + 1}</Col>
            <Col span={5}>{get(order, 'id', '').substring(10, 3)}</Col>
            <Col span={5}>
              {formatCurrency(get(order, 'orderItemId.unitPrice', '000'), 'VND')}
            </Col>
            <Col span={5}>
                {
                  { 0: 'Đang chờ', 1: 'Đã hoàn thành' }[
                    order.status
                  ]
                }
              </Col>
            <Col span={6}>
              <Row>
                {/* <Button
                  danger
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteOrder(dispatch, order.id)}>
                  Delete
                </Button> */}

                <Button
                  success
                  style={{ marginLeft: 10 }}
                  onClick={() => onShowDetail(get(order, 'orderItemId.id', ''))}>
                  Xem chi tiết
                </Button>
              </Row>
            </Col>
          </Row>
        );
      })}

      <div style={{ paddingTop: 10 }}>
        <Pagination
          current={+page}
          total={total}
          pageSize={LIMIT}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default OrderList;
