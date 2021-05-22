/* eslint-disable no-unused-vars */
import { ResponsiveLine } from '@nivo/line'
import React from "react";
import PropTypes from "prop-types";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

let dataTemp = [
    {
      "id": "japan",
      "color": "hsl(187, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 261
        },
        {
          "x": "helicopter",
          "y": 18
        },
        {
          "x": "boat",
          "y": 171
        },
        {
          "x": "train",
          "y": 298
        },
        {
          "x": "subway",
          "y": 298
        },
        {
          "x": "bus",
          "y": 246
        },
        {
          "x": "car",
          "y": 158
        },
        {
          "x": "moto",
          "y": 57
        },
        {
          "x": "bicycle",
          "y": 60
        },
        {
          "x": "horse",
          "y": 206
        },
        {
          "x": "skateboard",
          "y": 179
        },
        {
          "x": "others",
          "y": 24
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(135, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 181
        },
        {
          "x": "helicopter",
          "y": 229
        },
        {
          "x": "boat",
          "y": 14
        },
        {
          "x": "train",
          "y": 191
        },
        {
          "x": "subway",
          "y": 105
        },
        {
          "x": "bus",
          "y": 295
        },
        {
          "x": "car",
          "y": 139
        },
        {
          "x": "moto",
          "y": 139
        },
        {
          "x": "bicycle",
          "y": 118
        },
        {
          "x": "horse",
          "y": 220
        },
        {
          "x": "skateboard",
          "y": 227
        },
        {
          "x": "others",
          "y": 231
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(104, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 223
        },
        {
          "x": "helicopter",
          "y": 296
        },
        {
          "x": "boat",
          "y": 299
        },
        {
          "x": "train",
          "y": 141
        },
        {
          "x": "subway",
          "y": 188
        },
        {
          "x": "bus",
          "y": 135
        },
        {
          "x": "car",
          "y": 92
        },
        {
          "x": "moto",
          "y": 178
        },
        {
          "x": "bicycle",
          "y": 288
        },
        {
          "x": "horse",
          "y": 40
        },
        {
          "x": "skateboard",
          "y": 293
        },
        {
          "x": "others",
          "y": 212
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(26, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 74
        },
        {
          "x": "helicopter",
          "y": 150
        },
        {
          "x": "boat",
          "y": 77
        },
        {
          "x": "train",
          "y": 155
        },
        {
          "x": "subway",
          "y": 28
        },
        {
          "x": "bus",
          "y": 10
        },
        {
          "x": "car",
          "y": 112
        },
        {
          "x": "moto",
          "y": 39
        },
        {
          "x": "bicycle",
          "y": 190
        },
        {
          "x": "horse",
          "y": 139
        },
        {
          "x": "skateboard",
          "y": 46
        },
        {
          "x": "others",
          "y": 274
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(70, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 117
        },
        {
          "x": "helicopter",
          "y": 77
        },
        {
          "x": "boat",
          "y": 156
        },
        {
          "x": "train",
          "y": 175
        },
        {
          "x": "subway",
          "y": 141
        },
        {
          "x": "bus",
          "y": 240
        },
        {
          "x": "car",
          "y": 35
        },
        {
          "x": "moto",
          "y": 263
        },
        {
          "x": "bicycle",
          "y": 138
        },
        {
          "x": "horse",
          "y": 85
        },
        {
          "x": "skateboard",
          "y": 158
        },
        {
          "x": "others",
          "y": 282
        }
      ]
    }
  ];
console.log("data temp,", dataTemp)
export const DevicesLineChart = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Timeline',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Due Amount',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

DevicesLineChart.propTypes = {
    data: PropTypes.any
}