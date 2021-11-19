import React, { useContext } from 'react';
import { Validation } from '../../routes/Routes';
import Container from '../../Components/Container';
import FormComponent from '../../Components/FormComponent';
import axios from 'axios';


const Login = () => {
    const { token, setToken }= useContext(Validation);

    const initialValues = {
        mail:"",
        pass:""
    }

    function submitFunction(values, { resetForm }){ 
        axios({
            method:"post",
            url:"http://challenge-react.alkemy.org/",
            data:{
                email: values.mail,
                password: values.pass
            }
        })
        .then((res)=>{
            localStorage.setItem("loginToken", res.data.token);
            setToken(res.data.token);
        })
        .catch((err)=>{
            alert(err);
            resetForm();
        });
    }

    function validateFunction(values){
        let errors = {}
        if(!values.mail){
            errors.mail = "Por favor ingresar un e-mail para continuar."
        }
        if(!values.pass){
            errors.pass = "Por favor ingresa password para continuar."
        }
        return errors;
    }

    return(
        <Container>
            <h1 className="display-1 text-primary m-3 text-center">INICIAR SESIÓN</h1>
            <FormComponent
                initialValues={initialValues}
                submitFunction={submitFunction}
                validateFunction={validateFunction}
                submit="Ingresar"
            />
        </Container>
    );
}

export default Login;