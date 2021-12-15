import React from 'react'
import './style.css'
const Product = ({data}) => {
    const handleDelete =()=>{
        console.log('delete');
    }
const ProductList=[
    {
        id:1,
        name:'áo thun nam có cổ size-L',
        quantity:30,
        img:'https://storage.googleapis.com/cdn.nhanh.vn/store/3138/ps/20210830/AKM4027_XAH__4__thumb.jpg',
        Date: '27-10-2021' ,
        status: true
    },
    {
        id:2,
        name:'áo thun nam có cổ size-L',
        quantity:30,
        img:'https://storage.googleapis.com/cdn.nhanh.vn/store/3138/ps/20210830/AKM4027_XAH__4__thumb.jpg',
        Date: '27-10-2021' ,
        status: false
    },
    {
        id:3,
        name:'áo thun nam có cổ size-L',
        quantity:30,
        img:'https://storage.googleapis.com/cdn.nhanh.vn/store/3138/ps/20210830/AKM4027_XAH__4__thumb.jpg',
        Date: '27-10-2021' ,
        status:true,
    },
    {
        id:4,
        name:'áo thun nam có cổ size-L',
        quantity:30,
        img:'https://storage.googleapis.com/cdn.nhanh.vn/store/3138/ps/20210830/AKM4027_XAH__4__thumb.jpg',
        Date: '27-10-2021' ,
        status: false
    },
];    
    return (
        <div>
          <div className="col-10" style={{width:'100%'}}>
            <div className="card"style={{width:'100%'}}>
              <div className="card__body" >
                <tr className='table'>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>số lượng</th>
                  <th>hình ảnh</th>
                  <th>ngày nhập kho</th>
                  <th>trạng thái</th>
                  <th>Hành động khác</th>
                </tr>
                
                    {ProductList.map(({id,  name, quantity, img,Date, status })=>(
                <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td><img src={img} alt=""  /></td>
                    <td>{Date}</td>
                    <td> 
                        {status===true ? <button className='btn1'>còn hàng</button>: <button className='btn2' >hết hàng</button>}  </td>
                    <td style={{width:'200px'}}>
                        <button className='button1' onClick={handleDelete}>Xóa</button>
                        <button className='button2'>Sửa</button>
                    </td></tr>
                   
            ))}
                
          
                
              </div>
            </div>
          </div>
        </div>
    
            
        
    )
}

export default Product
