import { UploadOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Upload,
} from 'antd';
import {
  createCategoryAsync,
  updateCategoryAsync,
} from 'features/categorySlice';
import {
  getProductAsync,
  createProductAsync,
  removeProductAsync,
} from 'features/productSlice';
import { useGetCategory } from 'hooks/useGetCategory';
import { useGetColor } from 'hooks/useGetColor';
import { findIndex, get, keyBy, values } from 'lodash';
import 'pages/Auth/styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { postImageAsync } from 'features/imageSlice';

const { Option } = Select;

const ProductList = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const [productListData, setProductListData] = useState({});
  const isFormAdd = formName === 'add';

  const { categoryData } = useGetCategory();
  const { colorData } = useGetColor();

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

  const updateProduct = useCallback(
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

  const createProduct = useCallback(
    async (formValue) => {
      try {
        console.log(formValue, 'formValue')
        const includeColor = findIndex(
          values(productListData),
          (elm) => elm.productCode === formValue.productCode
        );

        if (includeColor === -1) {
          const createAction = await dispatch(createProductAsync(formValue));
          const data = unwrapResult(createAction);
          setProductListData({ ...productListData, [data.id]: data });
          Promise.resolve()
            .then(onCloseModal())
            .then(toast.success('Thêm sản phẩm thành công !'));
        } else {
          toast.error(`Sản phẩm ${formValue.includeColor} này đã tồn tại`, {
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
      createProduct(values);
    } else {
      updateProduct(values);
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

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const fileList = [];

  const handleChange = async ({ fileList }) => {
    try {
      const formData = new FormData();
      formData.append('codeColor', '#b2d66b');
      fileList.forEach((image) => {
        formData.append('images', image.originFileObj);
      });

      await dispatch(postImageAsync(formData));
    } catch (e) {
      console.log(e, '<----');
    }
  };

  if (isLoading) return <Spin />;
  return (
    <>
      <Modal
        title={isFormAdd ? 'Thêm sản phẩm' : 'Cập nhập sản phẩm'}
        visible={isShow}
        onCancel={onCloseModal}
        footer={null}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="true">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Mã sản phẩm"
                name="productCode"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="productName"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="male"
                label="Giới tính"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select placeholder="Chọn giới tính">
                  <Option value="0">Nam</Option>
                  <Option value="1">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select>
                  {categoryData.map((elm) => (
                    <Select.Option key={elm.id} value={elm.id}>
                      {get(elm, 'categoryName', '')}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Màu sản phẩm"
                name="colorId"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select>
                  {colorData.map((elm) => (
                    <Select.Option key={elm.id} value={elm.id}>
                      <Input
                        type="color"
                        disabled
                        value={get(elm, 'colorHex', '')}
                      />
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select>
                  <Select.Option value="0">Hết hàng</Select.Option>
                  <Select.Option value="1">Còn hàng</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Giảm giá"
                name="discount"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Size"
                name="size"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Vật liệu"
            name="materialProduct"
            rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="images"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
            extra="...">
            <Upload
              listType="picture-card"
              fileList={fileList}
              // onPreview={this.handlePreview}
              onChange={handleChange}>
              {fileList.length >= 8 ? null : 'Tải ảnh lên'}
            </Upload>
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
