import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'



const Upload = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const print = (event) => {
        console.log(selectedFile)
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFile);

        fetch(
            'http://127.0.0.1:8000/api/process_file/',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };



    //https://www.pluralsight.com/guides/uploading-files-with-reactjs

    return (
        <>
            <h1 className='text-center'>Carga de archivo</h1>
            <Form className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Label>Selecciona el archivo a subir</Form.Label>
                    <Form.Control type="file"
                        placeholder="Archivo de categorías"
                        accept="text/xml"
                        onChange={changeHandler} />
                </Form.Group>

                {isFilePicked && (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                )
                }



                <Row className="mt-5 text-center">
                    <Col>
                        <Button className="text-center" variant="primary" type="button" onClick={print}>
                            print
                        </Button>
                        <br />

                        <Button className="text-center mt-2" variant="primary" type="button" onClick={handleSubmission} >
                            Enviar categorías
                        </Button>
                    </Col>
                </Row>


            </Form>
        </>
    )
}

export default Upload