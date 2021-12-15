import { Col, Row } from 'antd';
import React from 'react';
import './styles.scss';
import storeImg from 'assets/images/store1.jpeg'

const AuthLayout = ({ children }) => {
  return (
    <div
      className="authForm"
      style={{
        backgroundImage: `url(${storeImg})`,
      }}>
      <div className="overlay-bg" />
      <div className="container">
        <Row gutter={24} align="middle" justify="center">
          <Col span={12}>{children}</Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthLayout;
