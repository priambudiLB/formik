import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const formErrorStyle = { color: 'red', height: '10px', fontSize: '10px' }
const CreateProductForm = () => {
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
            image: Yup.string().url()
                .required('Required'),
            price: Yup.number()
                .required('Required'),
        }),
        onSubmit: values => {
            console.log(values)
            // integrasi API: tinggal panggil API setelah submit
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            <div style={formErrorStyle}>{formik.touched.name && formik.errors.name}</div>
            <br />
            <label htmlFor="description">Description</label>
            <input
                id="description"
                name="description"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
            />
            <div style={formErrorStyle}>{formik.touched.description && formik.errors.description}</div>
            <br />
            <label htmlFor="image">Image URL</label>
            <input
                id="image"
                name="image"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.image}
            />
            <div style={formErrorStyle}>{formik.touched.image && formik.errors.image}</div>
            <br />
            <label htmlFor="price">Price</label>
            <input
                id="price"
                name="price"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
            />
            <div style={formErrorStyle}>{formik.touched.price && formik.errors.price}</div>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateProductForm;