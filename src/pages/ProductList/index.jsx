import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import {
  createCategoryAsync,
  getCategoryAsync,
  removeCategoryAsync,
  updateCategoryAsync,
} from 'features/categorySlice';

import {
  createProductAsync,
  getProductAsync,
  removeProductAsync,
  updateProductAsync,
} from 'features/productSlice';

import { findIndex, get, keyBy, values } from 'lodash';
import 'pages/Auth/styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductList = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const [productListData, setProductListData] = useState({});

  const isFormAdd = formName === 'add';

  useEffect(() => {
    (async () => {
      const getProductAction = await dispatch(getProductAsync());
      const { results } = unwrapResult(getProductAction);
      setProductListData(keyBy(results, 'id'));
    })();
  }, []);

  const { isLoading } = useSelector((state) => state.category);

  const onToggle = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const onCloseModal = useCallback(() => {
    setIsShow(false);
    setFormName('add');
  }, [isShow]);

  const onUpdate = (id) => {
    onToggle();
    setFormName('edit');
    setCurrentId(id);
  };

  const updateColor = useCallback(
    async (formValue) => {
      try {
        const includeColor = findIndex(
          values(productListData),
          (elm) => elm.categoryName === formValue.categoryName
        );

        if (includeColor === -1) {
          const payload = { id: currentId, data: formValue };
          await dispatch(updateCategoryAsync(payload));

          productListData[currentId] = {
            categoryName: formValue.categoryName,
            id: currentId,
          };
          setProductListData({ ...productListData });

          Promise.resolve()
            .then(onCloseModal())
            .then(setFormName('add'))
            .then(toast.success('Cập nhập thành công !'));
        } else {
          toast.error(`danh mục ${formValue.categoryName} này đã tồn tại`, {
            autoClose: 2000,
            theme: 'colored',
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [productListData, currentId]
  );

  const createColor = useCallback(
    async (formValue) => {
      try {
        const includeColor = findIndex(
          values(productListData),
          (elm) => elm.categoryName === formValue.categoryName
        );

        if (includeColor === -1) {
          const createAction = await dispatch(createCategoryAsync(formValue));
          const data = unwrapResult(createAction);
          setProductListData({ ...productListData, [data.id]: data });
          Promise.resolve()
            .then(onCloseModal())
            .then(toast.success('Thêm danh mục thành công !'));
        } else {
          toast.error(`Danh mục ${formValue.categoryName} này đã tồn tại`, {
            autoClose: 2000,
            theme: 'colored',
          });
        }
      } catch (e) {}
    },
    [productListData, values]
  );

  const onFinish = (values) => {
    if (formName === 'add') {
      createColor(values);
    } else {
      updateColor(values);
    }
  };

  const removeColor = useCallback(
    async (id) => {
      try {
        await dispatch(removeProductAsync(id));
        delete productListData[id];
        setProductListData({ ...productListData });
        toast.success('Xoá sản phẩm thành công !');
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [productListData]
  );

  if (isLoading) return <Spin />;
  return (
    <>
      <Modal
        title={isFormAdd ? 'Thêm danh mục sản phẩm' : 'Cập nhập danh mục'}
        visible={isShow}
        onCancel={onCloseModal}
        footer={null}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off">
          <Form.Item
            label="Tên danh mục"
            name="categoryName"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
            <Input placeholder="Tên danh mục..." />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row align="middle" justify="end">
              <Col>
                <Button type="default" onClick={onToggle}>
                  Huỷ bỏ
                </Button>
              </Col>

              <Col>
                <Button
                  type="primary"
                  style={{ marginLeft: 5 }}
                  htmlType="submit">
                  {isFormAdd ? 'Thêm Danh mục' : 'Cập nhật'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Row
        className="product-list__title"
        align="middle"
        justify="space-between"
        style={{ paddingBottom: 10 }}>
        <Col></Col>
        <Col>
          <Button type="primary" onClick={onToggle}>
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      <Row
        gutter={24}
        align="middle"
        justify="space-between"
        style={{
          background: '#FAFAFA',
          padding: 10,
        }}>
        <Col span={1}>STT</Col>
        <Col span={3}>Tên Sản phẩm</Col>
        <Col span={2}>Size</Col>
        <Col span={3}>Danh mục</Col>
        <Col span={3}>Giá</Col>
        <Col span={2}>Số lượng</Col>
        <Col span={4}>Hình ảnh</Col>
        <Col span={6}>Hành động</Col>
      </Row>

      {values(productListData).map((category, idx) => {
        return (
          <Row
            key={category.id}
            gutter={24}
            align="middle"
            justify="space-between"
            style={{
              background: '#FAFAFA',
              padding: 10,
            }}>
            <Col span={1}>{idx + 1}</Col>
            <Col span={3}>{get(category, 'product_name', '')}</Col>
            <Col span={2}>{get(category, 'product_size', '')}</Col>
            <Col span={3}>{get(category, 'category', '')}</Col>
            <Col span={3}>{get(category, 'price', '')}</Col>
            <Col span={2}>{get(category, 'sold', '')}</Col>
            <Col span={4}>
              <div>
                <img
                  src={get(category, 'images.url', '')}
                  alt="img"
                  width="100px"
                />
              </div>
            </Col>

            <Col span={6}>
              <Row>
                <Button
                  type="primary"
                  onClick={() => onUpdate(get(category, 'id', ''))}>
                  Sửa
                </Button>
                <Button
                  danger
                  style={{ marginLeft: 10 }}
                  onClick={() => removeColor(get(category, 'id', ''))}>
                  Xoá
                </Button>
              </Row>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default ProductList;
