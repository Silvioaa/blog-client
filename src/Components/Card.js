import React from 'react';

const Card = ({
    id,
    photo,
    title,
    fields,
    buttons=[],
    history,
    details=false,
    search=false
}) => {

    function imageError(e){
        e.target.src = "./imageNotAvailable.png";
    }

    return(
        <div className={details===true?"col-12 col-md-8":"col-sm-12 col-md-6 col-lg-4 mb-3"}>
            <div className="card h-100">
                <div className="card-body text-center p-3 d-flex flex-column">
                    <img alt="" onError={imageError} className={`card-img-top ${search===true?"h-75":"h-50"} w-100`} src={photo}/>
                    <h1 className="card-title text-primary display-6">{title}</h1>
                    <div className="card-text">
                    {
                        fields.map((field, index)=>{
                            return <div key={index}><b>{field[0]}</b><span>{field[1]==="null"?" No Disponible": " " + field[1]}</span></div>
                        })
                    }
                    </div>
                    <div className="d-flex mt-auto justify-content-center">
                    {
                        buttons.length!==0 && buttons.map((button, index)=>{
                            if(typeof button.linkOrFunction==="string"){
                                return <a key={index} className="btn btn-outline-primary m-2 d-flex align-items-center" onClick={()=>history.push(`${button.linkOrFunction+id}`)}>{button.name}</a>
                            }else{ 
                                return <a key={index} className="btn btn-outline-primary m-2 d-flex align-items-center" id={id} onClick={button.linkOrFunction}>{button.name}</a>
                            }
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;