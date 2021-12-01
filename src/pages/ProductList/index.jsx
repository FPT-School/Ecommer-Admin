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
import './styles.scss';
const { Option } = Select;

const ProductList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isShow, setIsShow] = React.useState(false);

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (data) => {
        return (
          <div style={{ height: 50 }}>
            <img
              src={data}
              alt="img"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
      productName: 'Áo',
      quantity: '10',
      image:
        'https://storage.googleapis.com/cdn.nhanh.vn/store/3138/ps/20210830/AKM4027_XAH__4__thumb.jpg',
      status: 'Còn hàng',
    },
    {
      id: '2',
      productName: 'Áo',
      quantity: '10',
      image:
        'https://storage.googleapis.com/cdn.nhanh.vn/store/3138/ps/20210830/AKM4027_XAH__4__thumb.jpg',
      status: 'Còn hàng',
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

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="product-list">
      <Modal
        title="Thêm sản phẩm"
        visible={isShow}
        onCancel={onToggle}
        footer={null}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off">
          <Form.Item
            label="Tên sản phẩm"
            name="nameProduct"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status">
            <Select
              defaultValue="lucy"
              style={{ width: '1' }}
              onChange={() => {}}>
              <Option value="0">Còn hàng</Option>
              <Option value="1">Hết hàng</Option>
            </Select>
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
                  Thêm sản phẩm
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Row
        className="product-list__title"
        align="middle"
        justify="space-between">
        <Col>
          <h2 className="page-header">Đặt hàng</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={onToggle}>
            Thêm sản phẩm
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

export default ProductList;
