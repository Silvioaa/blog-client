import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Path } from "../../routes/Routes";
import NavBar from "../../Components/NavBar";
import Container from "../../Components/Container";


const CreationForm = () => {

    const path = useContext(Path)

    const initialValues={
        title: "",
        body:""
      }
  
      function submitFunction(values,{resetForm}){
        fetch(`${path}posts`,{
            method:"post",
            body: JSON.stringify({
                title:values.title,
                body:values.body,
                userId:1
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.error){
                alert("Post creado con éxito.");
                resetForm();
            }
        })
      }
  
      function validateFunction(values){
        let errors = {}
        if(!values.title){
          errors.title = "Por favor ingresar un título para el post."
        }
        if(!values.body){
            errors.body = "Por favor ingresar el texto del post."
          }
        return errors;
      }

    return(
      <>
        <NavBar/>
        <Container>
          <h1 className="display-5 mb-5">Crear Post</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={submitFunction}
            validate={validateFunction}
          >
            {({errors})=>(
              <Form className="d-flex flex-column w-50">
                <div className="mb-3">
                    <label className="h5" for="title">Título</label>
                    <Field 
                        className="form-control" 
                        name="title"
                        type="text"
                        id="title"
                    />
                    <ErrorMessage 
                        name="title" 
                        component={()=><span className="text-danger">{errors.title}</span>}
                    />
                </div>
                <div className="mb-3">
                    <label className="h5" for="body">Texto</label>
                    <Field 
                        className="form-control" 
                        name="body"
                        as="textarea"
                        type="text"
                        id="body"
                    />

                    <ErrorMessage 
                        name="body" 
                        component={()=><span className="text-danger">{errors.body}</span>}
                    />
                </div>
                <input className="btn btn-primary mt-3 mb-5" type="submit" value="Crear Post"/>
              </Form>
            )}
            
          </Formik>
        </Container>
    </>
    );
}

export default CreationForm