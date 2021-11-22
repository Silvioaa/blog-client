import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Path } from "../../routes/Routes";
import { CurrentPostState } from "../../routes/PrivateRoutes";
import NavBar from "../../Components/NavBar";
import Container from "../../Components/Container";

const EditionForm = ({match}) => {

    const idToEdit = match.params.id;
    const path = useContext(Path)
    const { currentPost, setCurrentPost } = useContext(CurrentPostState)
  
      function submitFunction(values){
        try{
          fetch(`${path}posts/${idToEdit}`,{
              method:"PUT",
              body: JSON.stringify({
                  title:values.title,
                  body:values.body,
                  userId:values.userId
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
          })
          .then((res)=>res.json())
          .then((data)=>{
              if(!data.error){
                  alert("Post modificado con éxito.");
              }else{
                alert("No se pudo modificar el post. Hubo un error.")
              }
          })
          .catch((error)=>alert(error))
        }catch(error){
          alert(error);
        }
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

      useEffect(() => {
        console.log(currentPost, parseInt(idToEdit))
        if(Object.keys(currentPost).length===0||(currentPost.id!==parseInt(idToEdit))){
          try{
            fetch(`${path}posts/${idToEdit}`)
              .then((res)=>{
                if(!res.ok){
                  throw res.status;
                }
                return res.json()
              })
              .catch((error)=>setCurrentPost({
                error: error,
                id: parseInt(idToEdit)
              }))
              .then((data)=>{
                if(data!==undefined&&data!==null){
                  setCurrentPost(data)
                }
              })
          }catch(error){
            setCurrentPost({error: error})
          }
        }
      })


      if(Object.keys(currentPost).length!==0 && currentPost.id===parseInt(idToEdit) && !currentPost.error){
        let initialValues={
          title: currentPost.title,
          body: currentPost.body,
          userId: currentPost.userId
        }
        return(
          <>
            <NavBar/>
            <Container>
              <h1 className="display-5 mb-5">Editar Post</h1>
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
                    <input className="btn btn-primary mt-3 mb-5" type="submit" value="Editar Post"/>
                  </Form>
                )}
                
              </Formik>
            </Container> 
          </>
        )
      }
      if(Object.keys(currentPost).length!==0 && currentPost.error)
        return(
        <>
          <NavBar/>
          <Container>
            <h1>No se pudo cargar el post. Error {currentPost.error}.</h1>
          </Container>
        </>
        )
      
      return(<></>)
}

export default EditionForm