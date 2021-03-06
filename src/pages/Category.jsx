import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
} from 'antd';
import { LIMIT } from 'config';
import {
  createCategoryAsync,
  getByIdAsync,
  removeCategoryAsync,
  updateCategoryAsync,
} from 'features/categorySlice';
import { useGetCategory } from 'hooks/useGetCategory';
import { findIndex, get, values } from 'lodash';
import 'pages/Auth/styles.scss';
import qs from 'query-string';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const { Option } = Select;

const Category = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [isShow, setIsShow] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const [form] = Form.useForm();
  const isFormAdd = formName === 'add';

  const { isLoading, page, total, categoryData, setCategoryData } =
    useGetCategory();

  const onToggle = useCallback(() => {
    form.setFieldsValue({});
    setIsShow(!isShow);
  }, [form, isShow]);

  const onCloseModal = useCallback(() => {
    form.resetFields();
    setIsShow(false);
    setFormName('add');
  }, [form, isShow]);

  const onUpdate = async (id) => {
    onToggle();
    setFormName('edit');
    setCurrentId(id);
    const getByIdAction = await dispatch(getByIdAsync(id));
    const _data = unwrapResult(getByIdAction);
    form.setFieldsValue({
      categoryName: _data.categoryName,
      male: _data.male,
    });
  };

  const updateCategory = useCallback(
    async (formValue) => {
      try {
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
          .then(toast.success('C???p nh???p th??nh c??ng !'));
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [categoryData, currentId]
  );

  const createCategory = useCallback(
    async (formValue) => {
      try {
        const includeColor = findIndex(
          values(categoryData),
          (elm) => elm.categoryName === formValue.categoryName
        );

        if (includeColor === -1) {
          const createAction = await dispatch(createCategoryAsync(formValue));
          const data = unwrapResult(createAction);
          setCategoryData({ [data.id]: data , ...categoryData });
          Promise.resolve()
            .then(onCloseModal())
            .then(toast.success('Th??m danh m???c th??nh c??ng !'));
        } else {
          toast.error(`Danh m???c ${formValue.categoryName} n??y ???? t???n t???i`, {
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
      createCategory(values);
    } else {
      updateCategory(values);
    }
  };

  const removeCategory = useCallback(
    async (id) => {
      try {
        await dispatch(removeCategoryAsync(id));
        delete categoryData[id];
        setCategoryData({ ...categoryData });
        toast.success('Xo?? danh m???c th??nh c??ng !');
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [categoryData]
  );

  const handleChangePage = (page) => {
    const query = qs.parse(location.search);
    const newParams = qs.stringify({ ...query, page });
    history.replace({ pathname: location.pathname, search: newParams });
  };

  if (isLoading) return <Spin />;
  return (
    <>
      <Modal
        title={isFormAdd ? 'Th??m danh m???c s???n ph???m' : 'C???p nh???p danh m???c'}
        visible={isShow}
        onCancel={onCloseModal}
        footer={null}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off">
          <Form.Item
            label="T??n danh m???c"
            name="categoryName"
            rules={[{ required: true, message: 'Vui l??ng nh???p t??n danh m???c' }]}>
            <Input placeholder="T??n danh m???c..." />
          </Form.Item>

          <Form.Item
            name="male"
            label="Gi???i t??nh"
            rules={[{ required: true, message: 'Vui l??ng nh???p tr?????ng n??y' }]}>
            <Select placeholder="Ch???n gi???i t??nh">
              <Option value={0}>N???</Option>
              <Option value={1}>Nam</Option>
              <Option value={2}>Kh??c</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row align="middle" justify="end">
              <Col>
                <Button type="default" onClick={onToggle}>
                  Hu??? b???
                </Button>
              </Col>

              <Col>
                <Button
                  type="primary"
                  style={{ marginLeft: 5 }}
                  htmlType="submit">
                  {isFormAdd ? 'Th??m Danh m???c' : 'C???p nh???t'}
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
            Th??m danh m???c s???n ph???m
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
        <Col span={6}>T??n Danh m???c</Col>
        <Col span={12}>H??nh ?????ng kh??c</Col>
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
                  S???a
                </Button>
                <Button
                  danger
                  style={{ marginLeft: 10 }}
                  onClick={() => removeCategory(get(category, 'id', ''))}>
                  Xo??
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
          onChange={handleChangePage}
        />
      </div>
    </>
  );
};

export default Category;
