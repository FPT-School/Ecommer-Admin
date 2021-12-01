import React, { useState } from "react";
import Category from "../components/categorys/category";
import "antd/dist/antd.css";
import { Modal, Button, Input, Form } from "antd";

const category = [
  {
    id: 1,
    name: "asd",
    sort: "asdas",
  },
  {
    id: 2,
    name: "a3sa3sda3sda3sda3sda3sda3sda3sda3sda3",
    sort: "a3sa3sda3sda3sda3sda3sda3sda3sda3sda3",
  },
  {
    id: 3,
    name: "as2d",
    sort: "asdas",
  },
];
const Categors = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <div>
      <h2 className="page-header">Category</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Button type="primary" onClick={showModal}>
                Add Categoty
              </Button>
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
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Sort</th>
                <th>Action</th>
              </tr>
              {category.map((item) => (
                <Category key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categors;
