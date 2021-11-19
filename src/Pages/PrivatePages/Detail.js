import React, { useState, useEffect, useContext } from "react";
import { Path } from "../../routes/Routes";

const Detail = ({match}) => {
    const path = useContext(Path);
    const [ detailPost, setDetailPost ] = useState ({});
    const detailId = match.params.id

    useEffect(()=>{
        if(Object.keys(detailPost).length===0){
            fetch(`${path}posts/${detailId}`)
            .then((res)=>res.json())
            .then((data)=>setDetailPost(data))
        }
    })

    return(
        <>
            {
                Object.keys(detailPost).length!==0 &&
                    <>
                        <h1>{detailPost.title}</h1>
                        <div>{detailPost.body}</div>
                    </>
            }
        </>
    );
}

export default Detail;