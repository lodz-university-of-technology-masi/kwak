import React from 'react';
import {Formik, FieldArray, Form, Field} from 'formik';
import {API} from 'aws-amplify';

const AddTest = () => (
    <div>
        <h1>Create Test</h1>
        <Formik
            initialValues={{title: 'Title', lang: 'PL',  questions: []}}
            onSubmit={async (values) => {
                const response = await API.post('kwakApi', '/tests', {body: values})
                console.log(response);
            }}
            render={({values}) => (
                <Form>
                    <h2>Test data</h2>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field className="form-control" name="title"/>
                        <label htmlFor="lang">Lang</label>
                        <Field className="form-control" name="lang"/>
                    </div>
                    <h2>Question List</h2>
                    <FieldArray
                        name="questions"
                        render={arrayHelpers => (
                            <div>
                                {values.questions.map((question, index) => (
                                    <div className="form-group" key={index}>
                                        <label htmlFor={`questions.${index}.title`}>Title</label>
                                        <Field className="form-control" name={`questions.${index}.title`}/>
                                        <label htmlFor={`questions.${index}.description`}>Description</label>
                                        <Field className="form-control" name={`questions.${index}.description`}/>
                                        <label htmlFor={`questions.${index}.code`}>Code</label>
                                        <Field className="form-control" name={`questions.${index}.code`}/>
                                        <label htmlFor={`questions.${index}.type`}>Type</label>
                                        <Field className="form-control" name={`questions.${index}.type`}/>
                                        <button className="btn btn-secondary" type="button"
                                                onClick={() => arrayHelpers.remove(index)}>
                                            Remove
                                        </button>
                                        <hr/>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => arrayHelpers.push({
                                        title: 'Title',
                                        description: 'Description',
                                        code: 'if () then else',
                                        type: 'O'
                                    })}
                                >
                                    Add
                                </button>

                            </div>
                        )}
                    />
                    <div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </Form>
            )}
        />
    </div>
);

export default AddTest;