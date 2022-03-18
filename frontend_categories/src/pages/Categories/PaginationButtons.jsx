import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationButtons = ({ pageData, getInitCategories }) => {

    const goFirst = () => {
        if (pageData.current !==  1) getInitCategories(1)
    }

    const goPrev = () => {
        getInitCategories(pageData.previous)
    }
    
    const goNext = () => {
        getInitCategories(pageData.next)
    }

    const goLast = () => {
        if (pageData.current !== pageData.final)  getInitCategories(pageData.final)
    }
  return (
      
        <Pagination>
            <Pagination.First onClick={goFirst} />
            <Pagination.Prev onClick={goPrev} disabled={ pageData.previous === null }  />

            {pageData.previous && 
                <Pagination.Item onClick={goPrev} >{pageData.previous}</Pagination.Item> 
            }

            <Pagination.Item active>{pageData.current}</Pagination.Item>
            
            {pageData.next && 
                <Pagination.Item onClick={goNext} >{pageData.next}</Pagination.Item>
            }

            <Pagination.Next onClick={goNext} disabled={pageData.next === null} />

            <Pagination.Last onClick={goLast} />
        </Pagination>
      

  )
}

export default PaginationButtons