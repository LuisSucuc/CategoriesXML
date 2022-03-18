import React from 'react'
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { createCategory } from '../../services/CategoryService';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
   
    name: yup.string().required("Obligatorio"),
    level: yup.number().required("Obligatorio").positive("Nivel inválido"),
    best_offer_enabled: yup.boolean(),
    
});
const EditCategories = () => {
    const navigate = useNavigate();

  return (
      <Formik
          validationSchema={schema}
          onSubmit={async (values, actions) => {
              console.log(values)
              await createCategory(values)
              alert("Creado")
              navigate('/categories/')
          }}
          initialValues={{
              name: '',
              level: 1,
              best_offer_enabled: null,
          }}
      >
          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
          }) => (
              <>
                <h1>Crear nueva categoría</h1>
                <hr></hr>
        
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3 mt-4">
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationFormik103"
                            className="position-relative"
                        >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationFormik10L"
                            className="position-relative"
                        >
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Código"
                                name="id"
                                value={values.id}
                                onChange={handleChange}
                                isInvalid={!!errors.id}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">

                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationFormik10L"
                            className="position-relative"
                        >
                            <Form.Label>Nivel</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Level"
                                name="level"
                                value={values.level}
                                onChange={handleChange}
                                isInvalid={!!errors.level}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.level}
                            </Form.Control.Feedback>
                        </Form.Group>


                    
                    </Row>

                    <Form.Group className="position-relative mb-3">
                        <label>
                            <Field type="checkbox" name="best_offer_enabled" />
                            <span>  Best offer enabled</span>
                        </label>
                    </Form.Group>
                    <Form.Group className="position-relative mb-3">
                        <label>
                            <Field type="checkbox" name="auto_pay_enabled" />
                            <span> Auto pay enabled</span>
                        </label>
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <label>
                            <Field type="checkbox" name="leaf" />
                            <span> Leaf</span>
                        </label>
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <label>
                            <Field type="checkbox" name="lsd" />
                            <span> Lsd</span>
                        </label>
                    </Form.Group>
                
                    <Button type="submit">Enviar</Button>
                </Form>
              </>
          )}
      </Formik>
  )
}

export default EditCategories