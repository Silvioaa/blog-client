import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormComponent = ({
    initialValues,
    submitFunction,
    validateFunction,
    submit = false
}) => {
    const fields = Object.keys(initialValues);
    
    return(
        <Formik
            initialValues={initialValues}
            onSubmit={submitFunction}
            validate={validateFunction}
          >
            {({errors})=>(
              <Form className="d-flex flex-column w-50">
                  {
                      fields.map((fieldName, index) => {
                          return(
                              <div key={index} className="mb-3">
                                <div>
                                    <Field 
                                        className="form-control" 
                                        name={fieldName} 
                                        type={fieldName==="pass"?"password":"text"}
                                    />
                                </div>
                                <div>
                                    <ErrorMessage 
                                        name={fieldName} 
                                        component={()=><span className="text-danger">{errors[fieldName]}</span>}
                                    />
                                </div>
                              </div>
                          )
                      })
                  }
                  {
                      submit!==false &&
                      <input className="btn btn-primary mt-3 mb-5" type="submit" value={submit}/>
                  }
              </Form>
            )}
            
          </Formik>
    )

}

export default FormComponent;