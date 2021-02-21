import React from 'react'
import {VictoryChart,VictoryAxis,VictoryBar,VictoryTheme} from 'victory'


export default function ForestChart(props) {
  
    return (
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}

        
      
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

