import {
  Form,
  Input,
  Pagination,
  Button,
  Table,
  Row,
  Col,
  Modal,
  InputNumber,
  Select,
} from 'antd';
import React, { useCallback } from 'react';
const { Option } = Select;

const Categors = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isShow, setIsShow] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Hành động khác',
      dataIndex: '',
      key: 'x',
      render: () => (
        <div>
          <Button type="primary">Sửa</Button>
          <Button danger style={{ marginLeft: 10 }}>
            Xoá
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      id: '1',
      productName: 'ád',
    },
    {
      id: '2',
      productName: 'áda',
    },
  ];

  const onChangePage = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  const onToggle = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div className="product-list">
        <Modal
                title="Add Category"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <>
                  <Form style={{marginLeft:"-100px"}}
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="ID"
                      name="id"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập ID",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: false,
                          message: "Vui lòng nhập Name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Sort"
                      name="sort"
                      rules={[
                        {
                          required: false,
                          message: "Vui lòng nhập Sort",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              </Modal>

      <Row
        className="product-list__title"
        align="middle"
        justify="space-between">
        <Col>
          <h2 className="page-header">Đặt hàng</h2>
        </Col>
        <Col>
        <Button type="primary" onClick={showModal}>
                Add Categoty
              </Button>
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <div style={{ paddingTop: 10 }}>
        <Pagination current={currentPage} total={50} onChange={onChangePage} />
      </div>
    </div>
  );
};

export default Categors;
