import React from 'react'
import CategoryBoolean from './CategoryBoolean'


const Category = ({category}) => {

  return (
      <tr>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.level}</td>
          <td>{category.parent_id}</td>
          <CategoryBoolean value={category.auto_pay_enabled} />
          <CategoryBoolean value={category.best_offer_enabled} />
          <CategoryBoolean value={category.leaf} />
          <CategoryBoolean value={category.lds} />
          <td>Edit</td>
          <td>Delete</td>
      </tr>       
  )
}

export default Category