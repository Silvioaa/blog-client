import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Path } from "../../routes/Routes";


const CreationForm = () => {

    const path = useContext(Path)

    const initialValues={
        title: "",
        body:""
      }
  
      function submitFunction(values,{resetForm}){
        fetch(`${path}posts`,{
            method:"post",
            body:{
                title:values.title,
                body:values.body
            }
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data))
      }
  
      function validateFunction(values){
        let errors = {}
        /* if(!values.heroName){
          errors.heroName = "Por favor ingresar un nombre de personaje para buscar."
        } */
        return errors;
      }

    return(
        <Formik
            initialValues={initialValues}
            onSubmit={submitFunction}
            validate={validateFunction}
          >
            {({errors})=>(
              <Form className="d-flex flex-column w-50">
                <div className="mb-3">
                <div>
                    <Field 
                        className="form-control" 
                        name="title"
                        type="text"
                    />
                </div>
                <div>
                    <ErrorMessage 
                        name="title" 
                        component={()=><span className="text-danger">{errors.title}</span>}
                    />
                </div>
                <div>
                    <Field 
                        className="form-control" 
                        name="body"
                        type="text"
                    />
                </div>
                <div>
                    <ErrorMessage 
                        name="body" 
                        component={()=><span className="text-danger">{errors.body}</span>}
                    />
                </div>
                </div>
                <input className="btn btn-primary mt-3 mb-5" type="submit" value="Crear Post"/>
              </Form>
            )}
            
          </Formik>
    );
}

export default CreationForm