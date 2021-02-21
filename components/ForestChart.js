import React from 'react'
import {VictoryChart,VictoryAxis,VictoryBar,VictoryTheme} from 'victory'
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

export default function ForestChart(props) {
  
    return (
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={30}
        height={280}
      >
        <VictoryAxis
        style={{
          axisLabel: {
              padding: 36,
            fontSize: 15,
            fontStyle: "italic"
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
          }}
        }
        label="Kilometer"
          dependentAxis
          tickFormat={(x) => (`${x / 1000}k`)}
        />
        <VictoryBar
          data={props.data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    );
  
}

