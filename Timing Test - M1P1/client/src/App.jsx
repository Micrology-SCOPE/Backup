import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "./App.css";
import axios from "axios";

const App = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [renderTime, setRenderTime] = useState(null);
  const chartRef = useRef(null);

  const [cursor1Value, setCursor1Value] = useState(0);
  const [cursor2Value, setCursor2Value] = useState(0);

  const [maxYAxisValue, setMaxYAxisValue] = useState();
  const [channelCount, setChannelCount] = useState();

  useEffect(() => {
    let chart = echarts.init(chartRef.current, "dark");

    const MaxYAxis = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/calculated-value`
        );
        const data = response.data.calculatedValue;
        const fileCount = response.data.fileCount;
        setMaxYAxisValue(data);
        setChannelCount(fileCount);
      } catch (error) {
        console.error("Error in MaxYAxis:", error);
      }
    };

    const fetchDataAndPlot = async () => {
      setStart(new Date());
      if (channelCount === null) {
        return;
      }

      try {
        const series = [];
        const baselineSeries = [];
        let baselineIndex = 1;
        for (let fileType of ["CO", "T", "AI", "M", "P", "A"]) {
          for (let channel = 1; channel <= channelCount; channel++) {
            try {
              const response = await axios.get(
                `http://localhost:3000/api/channel/${channel}/${fileType}`
              );

              const augmentedChannelData = response.data.map((dataPoint) => {
                const augmentedValue = dataPoint;
                return augmentedValue;
              });

              const lineStyle = getLineStyle(fileType);

              series.push({
                name: `${fileType}${channel}`,
                type: "line",
                data: augmentedChannelData,
                showSymbol: false,
                lineStyle,
                xAxisIndex: 1,
                // emphasis: {
                //   focus: "series",
                // },
              });
              series.push({
                name: `${fileType}${channel}`,
                type: "line",
                data: augmentedChannelData,
                showSymbol: false,
                lineStyle,
                xAxisIndex: 0,
              });
              // series.push({
              //   type: "line",
              //   markLine: {
              //     silent: true,
              //     symbol: "none",
              //     label: {
              //       show: false,
              //       position: "end",
              //       formatter: `${fileType}${channel}`,
              //       textStyle: {
              //         color: "white",
              //       },
              //     },
              //     lineStyle: {
              //       color: "transparent",
              //       type: "dashed",
              //       width: 0.2,
              //     },
              //     data: [{ yAxis: augmentedChannelData[0] }],
              //   },
              // });
              if (fileType !== "P") {
                baselineSeries.push({
                  type: "line",
                  markLine: {
                    silent: true,
                    symbol: "none",
                    label: {
                      show: true,
                      position: "start",
                      // formatter: `${fileType}${channel}`,
                      formatter: function (params) {
                        if (fileType === "M") {
                          // Customize label for Channel "M" baseline
                          return `M${channel}P${channel}`;
                        } else {
                          // Use the default label for other channels
                          return `${fileType}${channel}`;
                        }
                      },
                      textStyle: {
                        color: "grey",
                        fontSize: 10,
                      },
                    },
                    lineStyle: {
                      color: "grey",
                      type: "dashed",
                      width: 0.6,
                    },
                    data: [{ yAxis: baselineIndex * 5000 }],
                  },
                });
                baselineIndex++;
              }
            } catch (error) {
              console.error(
                `Error reading data for CH ${channel} - ${fileType}:`
              );
            }
          }
        }

        const option = {
          tooltip: {
            show: true,
            trigger: "axis",
            triggerOn: "click",
            alwaysShowContent: false,
            axisPointer: {
              type: "cross",
              label: {
                show: true,
                backgroundColor: "blueviolet",
              },
              show: true,
              icon: "line",
            },
            // formatter: function (params) {
            //   let tooltipContent = "";
            //   let baselineIndex = 1;
            //   let totalChannelCount = params.length;
            //   console.log(totalChannelCount);
            //   for (const param of params) {
            //     if (!param.seriesName.includes("Baseline")) {
            //       let adjustedValue = param.value;
            //       if (!isNaN(adjustedValue)) {
            //         adjustedValue -= baselineIndex * 5000;
            //       }
            //       const seriesColor = param.color;
            //       const colorIcon = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${seriesColor};margin-right:5px;"></span>`;
            //       tooltipContent += `${colorIcon}${param.seriesName}: ${adjustedValue}<br>`;
            //     }
            //     baselineIndex++;
            //   }
            //   return tooltipContent;
            // },
            formatter: function (params) {
              let tooltipContent = "";
              let baselineIndex = 1;
              let totalChannelCount = params.length;
              console.log(totalChannelCount);
              for (const param of params) {
                if (!param.seriesName.includes("Baseline")) {
                  let adjustedValue = param.value;
                  if (!isNaN(adjustedValue)) {
                    adjustedValue -= baselineIndex * 5000;
                  } else {
                    adjustedValue = 0; // Set to 0 when the value is undefined
                  }
                  const seriesColor = param.color;
                  const colorIcon = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${seriesColor};margin-right:5px;"></span>`;
                  tooltipContent += `${colorIcon}${param.seriesName}: ${adjustedValue}<br>`;
                }
                baselineIndex++;
              }
              return tooltipContent;
            },
          },
          dataZoom: [
            {
              type: "inside",
              zoomOnMouseWheel: false,
              animation: false,
            },
          ],
          toolbox: {
            left: "right",
            itemSize: 15,
            top: 50,
            showTitle: true,
            iconStyle: {
              borderColor: "white",
            },
            backgroundColor: "transparent",
            feature: {
              dataZoom: {
                type: "inside",
                yAxisIndex: "none",
                zoomOnMouseWheel: false,
                animation: false,
              },
              restore: {},
              saveAsImage: {},
            },
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: series[0].data.map((_, index) => index),
              axisPointer: {
                show: true,
                snap: false,
                label: {
                  show: true,
                  formatter: function (params) {
                    const value = params.value;
                    setCursor2Value(value);
                    return value;
                  },
                },
                handle: {
                  show: true,
                  color: "white",
                  shadowColor: "transparent",
                  size: 35,
                },
              },
              position: "bottom",
              onZero: false,
              splitLine: false,
              xAxisIndex: 1,
            },
            {
              type: "category",
              boundaryGap: false,
              data: series[0].data.map((_, index) => index),
              axisPointer: {
                show: true,
                snap: false,
                label: {
                  show: true,
                  formatter: function (params) {
                    const value = params.value;
                    setCursor1Value(value);
                    return value;
                  },
                },
                handle: {
                  show: true,
                  color: "white",
                  shadowColor: "transparent",
                  size: 35,
                },
              },
              position: "bottom",
              onZero: false,
              splitLine: false,
              xAxisIndex: 0,
            },
          ],
          yAxis: {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            // max: maxYAxisValue,
            max: 220000,
          },
          legend: {
            height: 20,
            data: series.map((channel) => ({
              name: channel.name,
              icon: "circle",
              selectedMode: false,
            })),
          },

          series: [...series.concat(baselineSeries)],
        };

        chart.setOption(option);
        setEnd(new Date());
      } catch (error) {
        // console.error("Error reading data : ", error.message);
      }
    };
    MaxYAxis();
    fetchDataAndPlot();

    return () => {
      chart.dispose();
    };
  }, [channelCount, maxYAxisValue]);

  useEffect(() => {
    if (start && end) {
      const renderTimeInMs = end - start;
      setRenderTime(renderTimeInMs);
    }
  }, [start, end]);

  // Function to determine line width based on file type
  function getLineStyle(fileType) {
    if (fileType.startsWith("M")) {
      return {
        width: 4,
        color: "red",
      };
    } else if (fileType.startsWith("P")) {
      return {
        width: 2,
        color: "red",
      };
    } else {
      return {
        width: 0.2,
      };
    }
  }

  return (
    <>
      <div id="main" ref={chartRef} className="Chart" />
      <div className="Center">
        <p className="RenderTime">Render Time: {renderTime} ms</p>
        <div className="cursorData">
          <p>
            Cursor 1 {" : "}
            {Math.min(cursor1Value, cursor2Value)}
          </p>
          <p>
            Cursor 2 {" : "}
            {Math.max(cursor1Value, cursor2Value)}
          </p>
        </div>
      </div>
    </>
  );
};

export { App };
