import React, { useEffect, useState, useContext } from "react";
import { Path } from "../../routes/Routes";
import { PostsState, CurrentPostState } from "../../routes/PrivateRoutes";
import { Link } from "react-router-dom";

const Home = () => {

    const { posts,setPosts } = useContext(PostsState);
    const path = useContext(Path)


    function deletePost(e){
        e.preventDefault();
        try{
            const clickedId = e.target.parentElement.id;
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

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>res.json())
        .then((data)=>setPosts(data));
    },[])
    return(
        <>
            <h1>Posts</h1>
            <div className="d-flex flex-column">
                {
                    posts.length!==0&&
                    posts.map((post)=>
                        <div id={post.id} key={post.id}>
                            {post.title}
                            <button onClick={deletePost}>Borrar post</button>
                            <Link to={`detail/${post.id}`}>Ver detalle</Link>
                        </div>
                    )
                }
            </div>
    
        </>
    )
}

export default Home;