import React from 'react'
import {VictoryChart,VictoryAxis,VictoryBar,VictoryTheme,VictoryVoronoiContainer,VictoryTooltip} from 'victory'


export default function ForestChart(props) {
  const getTooltipText=function({datum}){
    const {area,year}=datum;
    const data=props.yearBefore.concat(props.data)
    const percentageBefore=data.filter(a=>a.year===year-1).length>0?data.filter(a=>a.year===year-1)[0].area:0;
    const percentageNow=percentageBefore===0?0:props.data.filter(a=>a.year===year)[0].area;
    const percentageLossOrGain=percentageBefore===0&&percentageNow===0?0:((Number(percentageBefore)-Number(percentageNow))/Number(percentageBefore))*100;
    return `forest area: ${area} km
    percentage loss: ${(percentageLossOrGain*-1<0?percentageLossOrGain:0).toFixed(2)}%
    percentage gain: ${(percentageLossOrGain*-1>0?percentageLossOrGain*-1:0).toFixed(2)}%`;
  }
    return (
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={getTooltipText}
            voronoiDimension="x"
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                style={{
                  fill: "grey",
                  fontSize: 11
                }}
                flyoutStyle={{
                  fill: "#24232a",
                  stroke: "blue",
                  strokeWidth: 0.5
                }}
              />
            }
          />
        }
        domainPadding={30}
      
      >
        <VictoryAxis
        style={{
          axisLabel: {
              padding: 37,
            fontSize: 15,
            fontStyle: "italic"
          },tickLabels:{
            angle: -45
          }}
        }
        label="Year"
          tickValues={props.year}
          tickFormat={props.year}
          
        />
        <VictoryAxis
         style={{
          axisLabel: {
              padding: 36,
            fontSize: 15,
            fontStyle: "italic"
          },
          tickLabels:{
            fontSize:9
          }
        }
        }
        label="Kilometer"
          dependentAxis
          tickFormat={(x) => (`${x>1000?(x / 1000).toFixed()+"k":x}`)}
        />
        <VictoryBar
          data={props.data}
          x="year"
          y="area"
        />
      </VictoryChart>
    );
  
}

