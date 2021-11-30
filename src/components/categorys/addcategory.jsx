import React from "react";
import 'antd/dist/antd.css';
import './addcategory.css'
import { Form, Input, InputNumber, Button } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
const Addcategors = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <h2 className="page-header">Add Category</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["user", "id"]}
                  label="ID"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "name"]}
                  label="Name"
                  rules={[
                    {
                        required: false,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "sort"]}
                  label="Sort"
                  rules={[
                    {
                        required: false,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Add Category
                  </Button>
                </Form.Item>
              </Form>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addcategors;
