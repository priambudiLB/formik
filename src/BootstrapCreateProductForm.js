import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const formErrorStyle = { color: 'red', height: '10px', fontSize: '10px' }
const BootstrapCreateProductForm = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            image: '',
            price: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            description: Yup.string()
                .max(100, 'Must be 100 characters or less')
                .required('Required'),
            image: Yup.string()
                .required('Required'),
            price: Yup.number()
                .required('Required'),
        }),
        onSubmit: values => {
            console.log(values)
            // integrasi API: tinggal panggil API setelah submit
            // URL jangan lupa append host di depan values image
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name} />
                <Form.Text style={formErrorStyle}>
                    {formik.touched.name && formik.errors.name}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description} />
                <Form.Text style={formErrorStyle}>
                    {formik.touched.description && formik.errors.description}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        https://api.dibimbing.id/images/
                    </InputGroup.Text>
                    <Form.Control type="text" onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.image} />
                </InputGroup>

                <Form.Text style={formErrorStyle}>
                    {formik.touched.image && formik.errors.image}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Rp</InputGroup.Text>
                    <Form.Control type="number" onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.price} />
                    <InputGroup.Text>,00</InputGroup.Text>
                </InputGroup>
                <Form.Text style={formErrorStyle}>
                    {formik.touched.price && formik.errors.price}
                </Form.Text>
            </Form.Group>
            <Button disabled={!formik.isValid} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default BootstrapCreateProductForm;