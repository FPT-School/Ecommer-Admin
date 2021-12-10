import { Button, Col, Form, Input, Modal, Row, Spin, Pagination } from 'antd';
import { LIMIT } from 'config';
import { deleteUserAsync, updateUserAsync } from 'features/userSlice';
import { useGetUser } from 'hooks/useGetUser';
import { findIndex, get, values } from 'lodash';
import 'pages/Auth/styles.scss';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';

const UserList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const [isShow, setIsShow] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const { page, total, isLoading, userData, setUserData } = useGetUser();
  const isFormAdd = formName === 'add';

    // eslint-disable-next-line no-console
  console.log(total, '<----');
  const onToggle = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const onCloseModal = useCallback(() => {
    setIsShow(false);
    setFormName('add');
  }, [isShow]);

  const updateColor = useCallback(
    async (formValue) => {
      try {
        const includeColor = findIndex(
          values(userData),
          (elm) => elm.categoryName === formValue.categoryName
        );

        if (includeColor === -1) {
          const payload = { id: currentId, data: formValue };
          await dispatch(updateUserAsync(payload));

          userData[currentId] = {
            categoryName: formValue.categoryName,
            id: currentId,
          };
          setUserData({ ...userData });

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
    [userData, currentId]
  );

  const onFinish = (values) => {
    updateColor(values);
  };

  const deleteUser = useCallback(
    async (id) => {
      try {
        await dispatch(deleteUserAsync(id));
        delete userData[id];
        setUserData({ ...userData });
        toast.success('Xoá tài khoản thành công !');
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [userData]
  );

  const handleChange = (page) => {
    history.push(`${match.url}?page=${page}`);
  };

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
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
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
        <Col span={5}> Email</Col>
        <Col span={5}> Địa chỉ</Col>
        <Col span={6}> Số điện thoại</Col>
        <Col span={6}> Hành động khác</Col>
      </Row>

      {values(userData).map((user, idx) => {
        return (
          <Row
            key={user.id}
            gutter={24}
            align="middle"
            justify="space-between"
            style={{
              background: '#FAFAFA',
              padding: 10,
            }}>
            <Col span={2}>{idx + 1}</Col>
            <Col span={5}>{get(user, 'email', '')}</Col>
            <Col span={5}>{get(user, 'address', '')}</Col>
            <Col span={6}>{get(user, 'phoneNumber', '')}</Col>
            <Col span={6}>
              <Row>
                {/* <Button
                  type="primary"
                  onClick={() => onUpdate(get(user, 'id', ''))}>
                  Sửa
                </Button> */}
                <Button
                  danger
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteUser(get(user, 'id', ''))}>
                  Xoá
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

export default UserList;
