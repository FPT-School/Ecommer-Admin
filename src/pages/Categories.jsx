import React from 'react'
import Category from '../components/categorys/category'

const category = [
    {
    id: 1,
    name: "asd",
    sort: "asdas"
    },
    {
        id: 2,
        name: "a3sa3sda3sda3sda3sda3sda3sda3sda3sda3",
        sort: "a3sa3sda3sda3sda3sda3sda3sda3sda3sda3"
    },
    {
        id: 3,
        name: "as2d",
        sort: "asdas"
    },
]
const Categors = () => {
    
    return (
        <div>
            <h2 className="page-header">Category</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Sort</th>
                                <th>Action</th>
                            </tr>
                            {category.map(item=>(
                                <Category
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categors
