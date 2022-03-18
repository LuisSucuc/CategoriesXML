import React, { useState, useEffect } from 'react'
import { getCategories } from '../../services/CategoryService';
import { Spinner, Table, Container, Row, Col } from 'react-bootstrap'
import Category from './Category';
import PaginationButtons from './PaginationButtons';


const Categories = () => {
    const [ categories, setCategories ] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInitCategories()
    }, []);


    const getInitCategories = async (page=1) => {
        const data = await getCategories(page)
        setCategories(data.data.results)
        delete data.data['results']
        setPageData(data.data)
        console.log(data.data)
        setLoading(false)
    }

    // call the function
    

    return (
        <>
        { loading ?
            <Spinner animation = "grow" variant = "info" />
            :
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Parent</th>
                            <th>Auto Play</th>
                            <th>Best Offer</th>
                            <th>Leaf</th>
                            <th>Lsd</th>
                        </tr>
                    </thead>
                    
                    <>
                        { categories.length > 0 &&

                            < tbody >

                                { categories.map( (category) =>(
                                
                                    <Category category={category} />
                                ))}
                            
                            </tbody>

                        }
                        
                    </>
                    
                    
                </Table>
                    <Container fluid>
                        <Row>
                            <Col>
                                <PaginationButtons pageData={pageData} getInitCategories={getInitCategories} />
                            </Col>
                            <Col style={{ textAlign: "right" }}>
                                <p className="text-right">   Total: {pageData.count}</p>
                            </Col>
                        </Row>
                    </Container>
                
            </>
            
        

        }
        </>
    )
}

export default Categories