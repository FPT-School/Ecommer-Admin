import React from 'react'
import { Fragment } from 'react'
import './category.css'

const Category = ({data}) => {
    
    return (
        <Fragment>
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.sort}</td>
                <td>
                    <button className='button1'>Xóa</button>
                    <button className='button2'>Sửa</button>
                </td>
            </tr>
        </Fragment>
    )
}

export default Category
