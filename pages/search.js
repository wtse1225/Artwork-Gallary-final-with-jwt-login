import { Form, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
//import { useForm } from 'react-hook-form'
import { useRouter } from "next/router";

export default function AdvanceSearch() {
    // setup the router
    const router = useRouter();

    // Take the form data and generate a queryString for the /artwork route
    const submitForm = (data) => {
        let queryString = '';

        queryString += `${data.searchBy}=true`;

        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;
        }

        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }

        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;

        // redirect the user to the query path using router
        router.push(`/artwork?${queryString}`);
    }

    // Set up methods to handle form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            searchBy: '',
            geoLocation: '',
            medium: '',
            isOnView: false,
            isHighlight: false,
            q: ''
        }
    });

    // useEffect hook to set values
    useEffect(() => {
        let data = {
            searchBy: 'title',
            geoLocation: '',
            medium: '',
            isOnView: false,
            isHighlight: false,
            q: ''
        }

        // explicitly set the values of each form field to match 'data'
        for (const prop in data) {
            setValue(prop, data[prop])
        }
    }, [])

    // register input fields and set up a partial validation for the form
    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control name="q" type="text" placeholder="" {...register('q', { required: true, maxLength: 50 })} />
                            {errors.q?.type === 'required' && <span className='is-invalid'> Please input a search phase</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy" className="mb-3" {...register('searchBy', { required: true})}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" name="geoLocation" {...register('geoLocation')}/>
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium" {...register('medium')}/>
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register('isHighlight')}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register('isOnView')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>

            <style>
                {`.is-invalid {color: red;}`}
            </style>
        </>
    )
}