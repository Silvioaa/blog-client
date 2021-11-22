import React, { useEffect, useState, useContext } from "react";
import { Path } from "../../routes/Routes";
import { PostsState, CurrentPostState } from "../../routes/PrivateRoutes";
import NavBar from "../../Components/NavBar";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";

const Home = ({history}) => {

    const { posts,setPosts } = useContext(PostsState);
    const { currentPost, setCurrentPost} = useContext(CurrentPostState)
    const path = useContext(Path)


    function deletePost(e){
        e.preventDefault();
        try{
            const clickedId = e.target.parentElement.id;
            console.log(clickedId)
            fetch(`${path}posts/${clickedId}`,{
                method:"DELETE"
            })
            .then((res)=>{
                if(res.status===200){
                    let postsValue = posts;
                    postsValue = postsValue.filter((post)=>post.id!==parseInt(clickedId))
                    console.log(postsValue)
                    setPosts(postsValue);
                    alert("Elemento borrado exitosamente")
                }else alert("No se pudo borrar el elemento");
            })
        }catch(error){
            alert(error);
        }
    }

    async function handleClick(e){
        try{
            e.preventDefault();
            const clickedId=e.target.parentElement.id;
            await fetch(`${path}posts/${clickedId}`)
            .then((res)=>res.json())
            .then((data)=>setCurrentPost(data));
            history.push(`/detail-edit/${clickedId}`);
        }catch(error){
            alert(error)
        }
    }

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>res.json())
        .then((data)=>setPosts(data));
    },[])
    return(
        <>
            <NavBar/>
            <Container>
                <h1 className="display-5 mb-5">Posts</h1>
                <div className="d-flex flex-column">
                    {
                        posts.length!==0&&
                        posts.map((post)=>
                            <div className="text-bloc d-flex flex-column card-body" key={post.id}>
                                <h3 className="text-bloc">{post.title}</h3>
                                <div id={post.id} className="d-flex">
                                    <Link className="btn btn-outline-primary" to={`detail/${post.id}`}>Ver detalle</Link>
                                    <button className="btn btn-outline-primary ms-2" onClick={deletePost}>Borrar post</button>
                                    <a className="btn btn-outline-primary ms-2" onClick={handleClick}>Editar post</a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Container>
    
        </>
    )
}

export default Home;