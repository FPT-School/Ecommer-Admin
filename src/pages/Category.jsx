import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import {
  createCategoryAsync,
  getCategoryAsync,
  removeCategoryAsync,
  updateCategoryAsync,
} from 'features/categorySlice';
import { findIndex, get, keyBy, values } from 'lodash';
import 'pages/Auth/styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Category = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const [categoryData, setCategoryData] = useState({});


  const isFormAdd = formName === 'add';

  useEffect(() => {
    (async () => {
      const getCategoryAction = await dispatch(getCategoryAsync());
      const { results } = unwrapResult(getCategoryAction);
      setCategoryData(keyBy(results, 'id'));
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
          values(categoryData),
          (elm) => elm.categoryName === formValue.categoryName
        );

        if (includeColor === -1) {
          const payload = { id: currentId, data: formValue };
          await dispatch(updateCategoryAsync(payload));

          categoryData[currentId] = {
            categoryName: formValue.categoryName,
            id: currentId,
          };
          setCategoryData({ ...categoryData });

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
    [categoryData, currentId]
  );

  const createColor = useCallback(
    async (formValue) => {
      try {
        const includeColor = findIndex(
          values(categoryData),
          (elm) => elm.categoryName === formValue.categoryName
        );

        if (includeColor === -1) {
          const createAction = await dispatch(createCategoryAsync(formValue));
          const data = unwrapResult(createAction);
          setCategoryData({ ...categoryData, [data.id]: data });
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
    [categoryData, values]
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
        await dispatch(removeCategoryAsync(id));
        delete categoryData[id];
        setCategoryData({ ...categoryData });
        toast.success('Xoá danh mục thành công !');
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [categoryData]
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
            Thêm danh mục sản phẩm
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
        <Col span={6}>STT</Col>
        <Col span={6}>Tên Danh mục</Col>
        <Col span={12}>Hành Động khác</Col>
      </Row>

      {values(categoryData).map((category, idx) => {
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
            <Col span={6}>{idx + 1}</Col>
            <Col span={6}>{get(category, 'categoryName', '')}</Col>

            <Col span={12}>
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

export default Category;
