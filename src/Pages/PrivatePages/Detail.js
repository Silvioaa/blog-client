import React, { useState, useEffect, useContext } from "react";
import { Path } from "../../routes/Routes";
import NavBar from "../../Components/NavBar";
import Container from "../../Components/Container";

const Detail = ({match}) => {
    const path = useContext(Path);
    const [ detailPost, setDetailPost ] = useState ({});
    const detailId = match.params.id

    useEffect(()=>{
        if(Object.keys(detailPost).length===0 || detailPost.id!==parseInt(detailId)){
            fetch(`${path}posts/${detailId}`)
            .then((res)=>{
                console.log(res)
                if(!res.ok)throw(res.status);
                else{
                return res.json()
            }})
            .then((data)=>{
                console.log(data)
                setDetailPost(data)
            })
            .catch((error)=>setDetailPost({error: error, id: parseInt(detailId)}));
            }
    })

    return(
        <>
            <NavBar/>
            <Container>
                {
                    (Object.keys(detailPost).length!==0 && !detailPost.error) &&
                        <>
                            <h1 className="display-6 text-capitalize align-self-start">{detailPost.title}</h1>
                            <div className="text-bloc align-self-start">{detailPost.body}</div>
                        </>
                }
                {
                    (Object.keys(detailPost).length!==0 && detailPost.error) &&
                        <>
                            <h1>No se puede cargar el post. Error {detailPost.error}.</h1>
                        </>
                }
            </Container>
        </>
    );
}

export default Detail;