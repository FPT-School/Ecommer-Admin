import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd';
import { JODY } from 'config';
import { getProfileAsync, loginAsync } from 'features/authSlice';
import 'pages/Auth/styles.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { ACCESS_TOKEN } from 'config';
import { REFRESH_TOKEN } from 'config';

const FormLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logging } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    const resultAction = await dispatch(loginAsync(values));
    const data = unwrapResult(resultAction);
    Promise.resolve().then(() => {
      if (data.user.role !== 'admin') {
        toast.error('Bạn cần đăng nhập bằng tài khoản admin', {
          autoClose: 2000,
          theme: 'colored',
        });
        return;
      } else {
        localStorage.setItem(
          ACCESS_TOKEN,
          get(data, 'tokens.access.token', '')
        );

        localStorage.setItem(
          REFRESH_TOKEN,
          get(data, 'tokens.refresh.token', '')
        );
        localStorage.setItem(JODY, JSON.stringify(data));
        toast.success('Đăng nhập thành công !', {
          autoClose: 2000,
          theme: 'colored',
        });
        history.push('/');
      }
    });
  };

  return (
    <div className="authForm__form">
      <div className="authForm__form__title">ĐĂNG NHẬP</div>
      <div className="authForm__form__description">
        Nếu bạn chưa có tài khoản, đăng kí tại đây
      </div>
      <Form
        className="authForm__form__root"
        name="basic"
        layout="vertical"
        initialValues={{
          email: 'root@gmail.com',
          password: 'aa123123',
        }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          label="Email của bạn"
          name="email"
          rules={[{ required: true, message: 'Yêu cầu nhập Email của bạn' }]}>
          <Input
            placeholder="Email"
            style={{
              padding: '7px 15px',
            }}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Yêu cầu nhập mật khẩu' }]}>
          <Input.Password
            placeholder="Password"
            style={{
              padding: '7px 15px',
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} shouldUpdate>
          {() => (
            <Button
              style={{
                width: '100%',
                height: '100%',
                background: '#2a2a86',
                borderRadius: 7,
                padding: '10px 5px',
              }}
              type="primary"
              htmlType="submit"
              disabled={logging}>
              {logging ? '...' : 'Đăng Nhập'}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormLogin;
