import React, { useState } from 'react';
import { Button, Form, Row, Col, Spinner, Alert, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { sendFile } from '../services/CategoryService';



const Upload = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    
    /**
     * Send to backend XML file
     * @returns 
     */

    const handleSubmission = async () => {
        if( !selectedFile )  return ;

        try {
            setLoading(true)
                        
            var response = await sendFile(selectedFile)
            
            response.data.error ? setErrorMessage('Error al procesar tu archivo. Es posible que las categorías ya existan.')  : setSuccessMessage(`Total de categorías insertadas: ${response.data.total_inserted}`) 
                             
            
            
        } catch (error) {
            setErrorMessage('Error interno. Vuelve a intentarlo.')
            
        } finally{
            setLoading(false)
        } 
    };



    return (
        <>

            {
                successMessage ?
                    <Alert variant="success" className=' text-center'>
                        < Alert.Heading> </Alert.Heading >
                        <h4> {successMessage}</h4>
                        <hr />
                        <Nav.Link  to="/Categories">
                            <Button className="text-center mt-2" variant="primary" type="button" onClick={() => navigate('/categories') } >
                                Ver Categorías
                            </Button>
                        </Nav.Link>
                    </Alert >

                :
                <>
                    <h1 className='text-center'>Carga de archivo</h1>
                    <Form className="mt-3">
                        <Form.Group className="mb-3 text-center">
                            <Form.Label>Selecciona el archivo a subir</Form.Label>
                            <Form.Control type="file"
                                placeholder="Archivo de categorías"
                                accept="text/xml"
                                onChange={changeHandler} />
                        </Form.Group>

                        {isFilePicked && (
                            <div className='text-center'>
                                <p>Tipo de archivo: {selectedFile.type}</p>
                                <p>Tamaño en bytes: {selectedFile.size}</p>
                                <p>
                                    Última modificación:{' '}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        )
                        }



                        <Row className="mt-2 text-center">
                            <Col>
                                { errorMessage &&
                                    <Alert variant="danger">
                                        <p className="mb-0">{errorMessage}</p>
                                    </Alert >
                                }

                                {
                                    loading ?
                                        <Spinner animation="grow" variant="info" />
                                        :
                                        <Button className="text-center mt-2" variant="primary" type="button" onClick={handleSubmission} >
                                            Subir archivo
                                        </Button>
                                }
                                
                            </Col>
                        </Row>
                    </Form>
                </>
            }
        </>
        
    )
}

export default Upload