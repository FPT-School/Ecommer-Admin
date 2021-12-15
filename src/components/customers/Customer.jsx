import React from 'react'
import './customer.css'
const Customer = ({data}) => {
    const handleDelete =()=>{
        console.log('delete');
    }
    return (

            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.address.city}</td>
                <td>{data.email}</td>
                <td style={{width:'200px'}}>
                    <button className='button1' onClick={handleDelete}>Xóa</button>
                    <button className='button2'>Sửa</button>
                </td>
            </tr>
        
    )
}

export default Customer
