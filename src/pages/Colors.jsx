import { Button, Col, Form, Input, Modal, Row, Spin, Table } from 'antd';

import {
  getByIdAsync,
  getColorAsync,
  createColorAsync,
  removeColorAsync,
  updateColorAsync,
} from 'features/colorSlice';

import 'pages/Auth/styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { values, get, keyBy, findIndex } from 'lodash';

const Colors = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const [colorData, setColorData] = useState({});
  const [form] = Form.useForm();

  const isFormAdd = formName === 'add';

  useEffect(() => {
    (async () => {
      const getColorAction = await dispatch(getColorAsync());
      const { results } = unwrapResult(getColorAction);
      setColorData(keyBy(results, 'id'));
    })();
  }, []);

  const { isLoading } = useSelector((state) => state.color);

  const onToggle = useCallback(() => {
    form.setFieldsValue({});
    setIsShow(!isShow);
  }, [form, isShow]);

  const onCloseModal = useCallback(() => {
    setIsShow(false);
    setFormName('add');
    form.resetFields();
  }, [form, isShow]);

  const onUpdate = async (id) => {
    onToggle();
    const getByIdAction = await dispatch(getByIdAsync(id));
    const _data = unwrapResult(getByIdAction);
    form.setFieldsValue(_data);
    setFormName('edit');
    setCurrentId(id);
  };

  const updateColor = useCallback(
    async (formValue) => {
      const payload = { id: currentId, data: formValue };
      await dispatch(updateColorAsync(payload));

      colorData[currentId] = {
        colorHex: formValue.colorHex,
        id: currentId,
      };
      setColorData({ ...colorData });

      Promise.resolve()
        .then(onCloseModal())
        .then(setFormName('add'))
        .then(toast.success('Cập nhập thành công !'));
    },
    [colorData, currentId]
  );

  const createColor = useCallback(
    async (formValue) => {
      try {
        const includeColor = findIndex(
          values(colorData),
          (elm) => elm.colorHex === formValue.colorHex
        );

        if (includeColor === -1) {
          const createAction = await dispatch(createColorAsync(formValue));
          const data = unwrapResult(createAction);
          setColorData({ ...colorData, [data.id]: data });
          Promise.resolve()
            .then(onCloseModal())
            .then(toast.success('Thêm màu thành công !'));
        } else {
          toast.error(`Màu ${formValue.colorHex} này đã tồn tại`, {
            autoClose: 2000,
            theme: 'colored',
          });
        }
      } catch (e) {}
    },
    [colorData, values]
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
        await dispatch(removeColorAsync(id));
        delete colorData[id];
        setColorData({ ...colorData });
        toast.success('Xoá màu thành công !');
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [colorData]
  );

  if (isLoading) return <Spin />;
  return (
    <>
      <Modal
        title={isFormAdd ? 'Thêm màu sản phẩm' : 'Cập nhật màu sản phẩm'}
        visible={isShow}
        onCancel={onCloseModal}
        footer={null}>
        <Form
          form={form}
          name="basic"
          initialValues={{ colorHex: '#000', remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off">
          <Form.Item
            label="Chọn màu"
            name="colorHex"
            rules={[{ required: true, message: 'Vui lòng chọn màu' }]}>
            <Input type="color" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row align="middle" justify="end">
              <Col>
                <Button type="default" onClick={onCloseModal}>
                  Huỷ bỏ
                </Button>
              </Col>

              <Col>
                <Button
                  type="primary"
                  style={{ marginLeft: 5 }}
                  htmlType="submit">
                  {isFormAdd ? 'Thêm màu' : 'Cập nhật'}
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
            Thêm màu sản phẩm
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
        <Col span={6}>Mã màu</Col>
        <Col span={6}>Mã Hex</Col>
        <Col span={12}>Hành Động khác</Col>
      </Row>

      {values(colorData).map((color) => {
        return (
          <Row
            key={color.id}
            gutter={24}
            align="middle"
            justify="space-between"
            style={{
              background: '#FAFAFA',
              padding: 10,
            }}>
            <Col span={6}>{get(color, 'colorHex', '')}</Col>
            <Col span={6}>
              <Input type="color" value={get(color, 'colorHex', '')} />
            </Col>
            <Col span={12}>
              <Row>
                <Button
                  type="primary"
                  onClick={() => onUpdate(get(color, 'id', ''))}>
                  Sửa
                </Button>
                <Button
                  danger
                  style={{ marginLeft: 10 }}
                  onClick={() => removeColor(get(color, 'id', ''))}>
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

export default Colors;
