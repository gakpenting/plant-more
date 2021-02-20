import React from 'react'
import {VictoryChart,VictoryAxis,VictoryBar,VictoryTheme} from 'victory'
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

export default class App extends React.Component {
  render() {
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
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          
        />
        <VictoryAxis
         style={{
          axisLabel: {
              padding: 36,
            fontSize: 15,
            fontStyle: "italic"
          }}
        }
        label="Hectar"
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    )
  }
}
