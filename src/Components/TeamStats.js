import React, { useEffect, useState, useContext } from 'react';
import { TeamState } from '../routes/PrivateRoutes';
import { translate } from '../Helpers/translate';

const TeamStats = ({
    stateToForceReRender
}) => {

    const [ cumulativeOrder, setCumulativeOrder ] = useState([]);
    const [ teamCumulative, setTeamCumulative ] = useState({
        intelligence:0,
        strength:0,
        speed:0,
        durability:0,
        power:0,
        combat:0,
    })
    const [ teamAverage, setTeamAverage ] = useState({
        altura:0,
        peso:0
    })
    const { team, setTeam } = useContext(TeamState);

    useEffect(() => {
        let teamCumulativeValue = teamCumulative;
        let teamAverageValue = teamAverage;
        let averageHeight = 0; 
        let averageWeight = 0;
  
        team.forEach((hero)=>{

          Object.keys(teamCumulativeValue).forEach((property)=>{
              teamCumulativeValue[property] = isNaN(parseInt(hero.powerstats[property]))?
              teamCumulativeValue[property]:
              teamCumulativeValue[property]+parseInt(hero.powerstats[property])
          })
            
          if(hero.appearance.height[1].slice(-3)===" cm"){
            let heroHeight = hero.appearance.height[1].split(" ");
            heroHeight = parseInt(heroHeight[0]);
            averageHeight += heroHeight;
          }
  
          if(hero.appearance.weight[1].slice(-3)===" kg"){
            let heroWeight = hero.appearance.weight[1].split(" ");
            heroWeight = parseInt(heroWeight[0]);
            averageWeight += heroWeight;
          }
        })

        averageHeight=team.length===0?0:averageHeight/team.length;
        averageWeight=team.length===0?0:averageWeight/team.length;
        teamAverageValue.altura=averageHeight;
        teamAverageValue.peso=averageWeight;
        
  
        let cumulativeOrderValue = Object.entries(teamCumulativeValue);
        let maximumValue = 0;
        let maximumIndex;
  
        cumulativeOrderValue.map((variable, index)=>{
          if(variable[1]>maximumValue){
            maximumValue = variable[1];
            maximumIndex = index;
          }
        })
  
        const firstElement = cumulativeOrderValue.splice(maximumIndex,1);
        cumulativeOrderValue.unshift(firstElement[0]);
        setTeamCumulative(teamCumulativeValue);
        setCumulativeOrder(cumulativeOrderValue);
        setTeamAverage(teamAverageValue)
  
    },[stateToForceReRender])

    return(
        <div id="cumulative" className="d-flex justify-content-center">
            <div className="border border-primary d-flex flex-wrap p-3 m-3 align-items-start rounded">
                <div className="d-flex flex-column me-5 mb-3">
                    <h3 className="text-primary">ACUMULATIVO</h3>

                    {cumulativeOrder.length!==0&&
                    cumulativeOrder.map((cumulative, index)=>{
                        return(
                          <span key={index} className="text-secondary">
                            <b className="text-capitalize">{translate(cumulative[0])}:</b> {cumulative[1]}
                          </span>)
                    })}
                </div>
                <div className="d-flex flex-column">
                    <h3 className="text-primary">PROMEDIOS</h3>
                    <span className="text-secondary"><b>Altura:</b> {teamAverage.altura.toFixed(2)} cm</span>
                    <span className="text-secondary"><b>Peso:</b> {teamAverage.peso.toFixed(2)} kg</span>
                </div>
            </div>
        </div>
    );
}

export default TeamStats;