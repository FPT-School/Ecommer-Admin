import Sidebar from 'components/sidebar/Sidebar';
import Topnav from 'components/topnav/TopNav';
import React from 'react';
import { Row, Col } from 'antd';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <Row gutter={24}>
        <Col span={6}>
          <Sidebar {...props} />
        </Col>
        <Col span={18}>
          <div className="layout__content">
            <Topnav />
            <div className="layout__content-main">{children}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
