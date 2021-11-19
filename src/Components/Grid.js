import React, { Fragment } from 'react';
import Card from './Card';
import { createCardsData } from '../Helpers/createCardsData';

const Grid = ({
    items, 
    type, 
    buttons, 
    history,
    search=false
}) => {

    const cardsData = createCardsData(items,type,buttons)

    let cardsItems = cardsData.items.map((item,index)=>{
        return (
            <Card
                key={index}
                id={item.id}
                photo={item.image.url}
                title={item.name}
                fields={cardsData.fields[index]}
                buttons={buttons}
                history={history}
                search={search}
            />
        );
    })
    
    return (
        <div className="container w-75">
            <div className="row">
                {
                    cardsItems.map((card,index)=>{
                        return (<Fragment key={index} >{card}</Fragment>)
                    })
                }
            </div>
        </div>
    );
}

export default Grid;