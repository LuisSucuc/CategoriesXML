import React, { useState, useEffect } from 'react'
import { getCategories } from '../../services/CategoryService';
import { Spinner, Table, Container, Row, Col, Nav, Button } from 'react-bootstrap'
import Category from './Category';
import PaginationButtons from './PaginationButtons';
import { useNavigate } from 'react-router-dom';


const Categories = () => {
    const [ categories, setCategories ] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getInitCategories()
    }, []);


    const getInitCategories = async (page=1) => {
        try {
            const data = await getCategories(page)
            setCategories(data.data.results)
            delete data.data['results']
            setPageData(data.data)
            console.log(data.data)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)

       
    }

    // call the function
    

    return (
        <>
            { loading ?
                <Spinner animation = "grow" variant = "info" />
                :
                
                <>
                    {categories.length > 0 ?
                        <>
                            <Nav.Link to="/categories">
                                <Button className="text-center mt-2" variant="primary" type="button" onClick={() => navigate('/categories/add/')} >
                                    Crear
                                </Button>
                            </Nav.Link>

                            <Table striped bordered hover responsive>
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
                                        <th>Delete</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                    
                                <tbody>
                                    { categories.map( (category) =>( <Category category={category} /> ))}
                                </tbody>
                                    
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
                        :
                        <h3 style={{ textAlign: "center" }} >Sin datos</h3>
                    }

                </>
            }
        </>
    )
}

export default Categories