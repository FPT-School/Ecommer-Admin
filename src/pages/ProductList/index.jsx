import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
  Upload,
} from 'antd';
import qs from 'query-string';
import { LIMIT } from 'config';
import { postImageAsync } from 'features/imageSlice';
import {
  createProductAsync,
  getProductByIdAsync,
  removeProductAsync,
  updateProductAsync,
} from 'features/productSlice';
import { useGetCategory } from 'hooks/useGetCategory';
import { useGetColor } from 'hooks/useGetColor';
import { useGetProduct } from 'hooks/useGetProduct';
import { findIndex, get, values } from 'lodash';
import 'pages/Auth/styles.scss';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, useLocation } from 'react-router';
import RichTextEditor from 'react-rte';
import { toast } from 'react-toastify';
import { formatCurrency } from 'utils/formatCurrency';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const [form] = Form.useForm();

  const [isShow, setIsShow] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isGetDetail, setIsGetDetail] = useState(false);
  const [formName, setFormName] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  const isFormAdd = formName === 'add';
  const [images, setImages] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [idCollectImage, setIdCollectImage] = useState(null);
  const [dataUpdate, setDataUpdate] = useState({});

  const { categoryData } = useGetCategory();
  const { colorData } = useGetColor();

  const [valueRTE, setValueRTE] = useState(RichTextEditor.createEmptyValue());

  const { page, total, isFetchData, productListData, setProductListData } =
    useGetProduct();

  const onToggle = useCallback(() => {
    form.setFieldsValue({});
    setFileList(null);
    setValueRTE(RichTextEditor.createEmptyValue());
    setIsShow(!isShow);
  }, [isShow, form, fileList, valueRTE]);

  const onCloseModal = () => {
    form.resetFields();
    setIsShow(false);
    setFormName('add');
  };

  const onChangeRTE = (value) => {
    setValueRTE(value);
  };

  const onUpdate = async (id) => {
    try {
      setIsGetDetail(true);
      const productByIdAction = await dispatch(getProductByIdAsync(id));
      const _data = unwrapResult(productByIdAction);
      const initialValueForm = {
        male: _data.male + '',
        discount: _data.discount,
        price: _data.price,
        productCode: _data.productCode,
        productName: _data.productName,
        size: _data.size,
        status: _data.status + '',
        categoryId: get(_data, 'categoryId.id', ''),
        colorId: get(_data, 'colorId.id', ''),
        materialProduct: _data.materialProduct,
      };

      form.setFieldsValue(initialValueForm);
      onToggle(true);
      setFormName('edit');
      setCurrentId(id);

      setIdCollectImage(
        get(_data, 'imageProductId.id', '61a9c79a1fdf955bd74e8677')
      );

      // setFileList(null);

      setFileList(() => {
        const _fileList = [];
        get(_data, 'imageProductId.images', []).map((item, idx) => {
          _fileList.push({
            uid: idx,
            name: 'image.png',
            status: 'done',
            url: item.path,
          });
        });
        return _fileList;
      });
    } finally {
      setIsGetDetail(false);
    }
  };

  const checkDataUpdate = (formValues) => {
    return new Promise(async (resolve, reject) => {
      if (images) {
        console.log('has image');
        const uploadAction = await dispatch(postImageAsync(images));
        const { id } = unwrapResult(uploadAction);
        Promise.resolve()
          .then(setIdCollectImage(id))
          .then(() => {
            const data = {
              ...formValues,
              status: +formValues.status,
              detailProduct: valueRTE.toString('html'),
              imageProductId: id || '61a9c79a1fdf955bd74e8677',
            };
            setDataUpdate(data);
            resolve(data);
          });
      } else {
        const data = {
          ...formValues,
          status: +formValues.status,
          detailProduct: valueRTE.toString('html'),
          imageProductId: idCollectImage || '61a9c79a1fdf955bd74e8677',
        };
        setDataUpdate(data);
        resolve(data);
      }
    });
  };

  const updateProduct = useCallback(
    async (formValues) => {
      try {
        setIsCreating(true);
        const _dataUpdate = await checkDataUpdate(formValues);
        const payload = { id: currentId, data: _dataUpdate };
        const updateProductAction = await dispatch(updateProductAsync(payload));
        const { id: currentIdProduct } = unwrapResult(updateProductAction);

        const productByIdAction = await dispatch(
          getProductByIdAsync(currentIdProduct)
        );
        const _data = unwrapResult(productByIdAction);

        productListData[currentIdProduct] = _data;

        Promise.resolve()
          .then(onCloseModal())
          .then(setFormName('add'))
          .then(toast.success('Cập nhập thành công !'));
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      } finally {
        setIsCreating(false);
      }
    },
    [productListData, currentId, images]
  );

  const createProduct = useCallback(
    async (formValues) => {
      try {
        setIsCreating(true);
        const includeProductCode = findIndex(
          values(productListData),
          (elm) => elm.productCode === formValues.productCode
        );
        if (includeProductCode === -1) {
          const _dataUpdate = await checkDataUpdate(formValues);
          // create product with payload body
          const createAction = await dispatch(createProductAsync(_dataUpdate));
          const { id: idNewProduct } = unwrapResult(createAction);

          const productByIdAction = await dispatch(
            getProductByIdAsync(idNewProduct)
          );
          const _data = unwrapResult(productByIdAction);

          setProductListData({ ...productListData, [idNewProduct]: _data });
          Promise.resolve()
            .then(onCloseModal())
            .then(toast.success('Thêm sản phẩm thành công !'));
        } else {
          toast.error(`Mã sản phẩm ${formValues.productCode} này đã tồn tại`, {
            autoClose: 2000,
            theme: 'colored',
          });
        }
      } catch (e) {
      } finally {
        setIsCreating(false);
      }
    },
    [productListData, values, images]
  );

  const onFinish = (values) => {
    if (formName === 'add') {
      createProduct(values);
    } else {
      updateProduct(values);
    }
  };

  const removeColor = useCallback(
    async (id) => {
      try {
        await dispatch(removeProductAsync(id));
        delete productListData[id];
        setProductListData({ ...productListData });
        toast.success('Xoá sản phẩm thành công !');
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          theme: 'colored',
        });
      }
    },
    [productListData]
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const customRequest = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      // const res = dispatch(postImageAsync(fmData, config));
      onSuccess('Ok');
    } catch (err) {
      onError({ err });
    }
  };

  const handleChange = ({ fileList }) => {
    const formData = new FormData();
    formData.append('codeColor', '#b2d66b');
    fileList.forEach((image) => {
      formData.append('images', image.originFileObj);
    });
    setImages(formData);
  };

  const handleRemoveImage = (fileId) => {
    const newFileList = fileList.filter((item) => item.uid !== fileId);
    setFileList(newFileList);
  };

  const handleChangePage = (page) => {
    const query = qs.parse(location.search);
    const newParams = qs.stringify({ ...query, page });
    history.replace({ pathname: location.pathname, search: newParams });
  };

  const handleSort = (query) => {
    const params = qs.stringify(qs.parse(query));
    history.replace({ pathname: location.pathname, search: params });
  };

  if (isFetchData) return <Spin />;

  return (
    <>
      <Modal
        style={{ position: 'relative' }}
        title={isFormAdd ? 'Thêm sản phẩm' : 'Cập nhập sản phẩm'}
        visible={isShow}
        onCancel={onCloseModal}
        footer={null}>
        <div>{isGetDetail && <Spin />}</div>

        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="true">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Mã sản phẩm"
                name="productCode"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="productName"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="male"
                label="Giới tính"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select placeholder="Chọn giới tính">
                  <Option value="0">Nữ</Option>
                  <Option value="1">Nam</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select>
                  {values(categoryData).map((elm) => (
                    <Select.Option key={elm.id} value={elm.id}>
                      {get(elm, 'categoryName', '')}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Màu sản phẩm"
                name="colorId"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select>
                  {colorData.map((elm) => (
                    <Select.Option key={elm.id} value={elm.id}>
                      <Input
                        type="color"
                        disabled
                        value={get(elm, 'colorHex', '')}
                      />
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                defaultValue="0"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Select>
                  <Select.Option value="0">Hết hàng</Select.Option>
                  <Select.Option value="1">Còn hàng</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Giảm giá"
                name="discount"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <InputNumber style={{ width: '100%' }} max={20} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Size"
                name="size"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vật liệu"
                name="materialProduct"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <RichTextEditor value={valueRTE} onChange={onChangeRTE} />

          <Form.Item
            label="Hình ảnh"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
            extra="...">
            <Row gutter={24}>
              {(fileList || []).map((file) => (
                <Col span={8}>
                  <Image src={file.url} width={100} height={100} />
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveImage(file.uid)}>
                    <DeleteOutlined />
                  </div>
                </Col>
              ))}
            </Row>
            <Upload
              // showUploadList={false}
              onChange={handleChange}
              customRequest={customRequest}
              listType="picture-card"
              maxCount={3}
              multiple>
              Tải ảnh lên
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row align="middle" justify="end">
              <Col>
                <Button type="default" onClick={onToggle} disabled={isCreating}>
                  Huỷ bỏ
                </Button>
              </Col>

              <Col>
                <Button
                  type="primary"
                  style={{ marginLeft: 5 }}
                  htmlType="submit"
                  disabled={isCreating}>
                  {isCreating ? (
                    <Spin />
                  ) : (
                    <>{isFormAdd ? 'Thêm Danh mục' : 'Cập nhật'}</>
                  )}
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
        <Col>
          <Button type="primary" onClick={onToggle}>
            Thêm sản phẩm
          </Button>
        </Col>
        <Col>
          <Col xs={4}>
            <Select
              style={{ width: 200 }}
              defaultValue="sortBy=price:desc"
              onChange={handleSort}>
              {[
                {
                  label: 'Giá từ cao',
                  value: 'sortBy=price:desc',
                },
                {
                  label: 'Giá từ thấp',
                  value: 'sortBy=price:asc',
                },
                {
                  label: 'Giới tính Nữ',
                  value: 'male=0',
                },
                {
                  label: 'Giới tính Nam',
                  value: 'male=1',
                },
              ].map(({ label, value }, idx) => (
                <Option key={idx} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Col>
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
        <Col span={1}>STT</Col>
        <Col span={3}>Tên Sản phẩm</Col>
        <Col span={3}>Danh mục</Col>
        <Col span={3}>Giá</Col>
        <Col span={2}>Giảm giá</Col>
        <Col span={4}>Hình ảnh</Col>
        <Col span={6}>Hành động</Col>
      </Row>

      {values(productListData).map((product, idx) => {
        return (
          <Row
            key={product.id}
            gutter={24}
            align="middle"
            justify="space-between"
            style={{
              background: '#FAFAFA',
              padding: 10,
            }}>
            <Col span={1}>{idx + 1}</Col>
            <Col span={3}>{get(product, 'productName', '')}</Col>
            <Col span={3}>{get(product, 'categoryId.categoryName', '')}</Col>
            <Col span={3}>
              {formatCurrency(get(product, 'price', 100), 'VND')}
            </Col>
            <Col span={2}>{get(product, 'discount', '')}%</Col>
            <Col span={4}>
              <Image.PreviewGroup>
                {get(product, 'imageProductId.images', []).map((image, idx) => {
                  return (
                    <Image
                      key={idx}
                      src={image.path}
                      alt={image.index}
                      width={50}
                      height={50}
                    />
                  );
                })}
              </Image.PreviewGroup>
            </Col>

            <Col span={6}>
              <Row>
                <Button
                  type="primary"
                  onClick={() => onUpdate(get(product, 'id', ''))}>
                  Sửa
                </Button>
                <Button
                  danger
                  style={{ marginLeft: 10 }}
                  onClick={() => removeColor(get(product, 'id', ''))}>
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
          onChange={handleChangePage}
        />
      </div>
    </>
  );
};

export default ProductList;
