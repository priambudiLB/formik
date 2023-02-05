import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_APIKEY;
const formErrorStyle = { color: 'red', height: '10px', fontSize: '10px' }
const LoginForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // kalo misalnya searchParams.get("page") kosong/null, jadiin 1
    const currentPage = parseInt(searchParams.get("page"), 10) || 1
    console.log(searchParams.get("page"), currentPage)
    const [page, setPage] = useState(currentPage)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            setIsLoading(true)
            axios({
                method: 'get',
                // kalo pake string 1 petik
                // url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=' + API_KEY,
                url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`,
            })
                .then(function (response) {
                    const request_token = response.data.request_token;
                    console.log(request_token)
                    axios({
                        method: 'post',
                        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
                        data: {
                            username: values.username,
                            password: values.password,
                            request_token: request_token
                        }
                    })
                        .then(function (response) {
                            console.log(response.data)
                            axios({
                                method: 'post',
                                url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                                data: {
                                    request_token: request_token
                                }
                            })
                                .then(function (response) {
                                    const session_id = response.data.session_id;
                                    console.log(session_id)
                                    if (session_id) {
                                        navigate('/profile')
                                        localStorage.setItem('SID', session_id)
                                        // redirect ke halaman user profile/home/timeline
                                        // alert("Berhasil login dengan session id: " + session_id)
                                    }
                                    setIsLoading(false)
                                })
                                .catch(function (error) {
                                    alert(error.message)
                                    setIsLoading(false)
                                });
                        })
                        .catch(function (error) {
                            alert(error.message)
                            setIsLoading(false)
                        });
                })
                .catch(function (error) {
                    alert(error.message)
                    setIsLoading(false)
                });
        },
    });

    return (
        <>
            current page: {page}
            <button onClick={() => {
                setSearchParams({ page: currentPage + 1 })
                setPage(prev => prev + 1)

            }}>Increment Page</button>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username} />
                    <Form.Text style={formErrorStyle}>
                        {formik.touched.username && formik.errors.username}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password} />
                    <Form.Text style={formErrorStyle}>
                        {formik.touched.password && formik.errors.password}
                    </Form.Text>
                </Form.Group>
                <Button disabled={!formik.isValid || isLoading} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;