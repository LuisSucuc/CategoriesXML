import React from 'react'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

const CategoryBoolean = ({value}) => {
  return (
      <td className='text-center'>
          { value ?
              <CheckCircleFill color="green" size={20} />
            :
              <XCircleFill color="red" size={20} />
          }
        </td>
  )
}

export default CategoryBoolean