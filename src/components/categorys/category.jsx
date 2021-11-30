import React from 'react'
import './category.css'

const Category = ({data}) => {

    return (

            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.sort}</td>
                <td>
                    <button className='button3'>Thêm</button> 
                    <button className='button1'>Xóa</button>
                    <button className='button2'>Sửa</button>
                </td>
            </tr>
        
    )
}

export default Category
