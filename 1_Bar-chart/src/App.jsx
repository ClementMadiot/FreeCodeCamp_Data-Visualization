import React from "react";
import * as d3 from "d3";

const urlGDP =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// Chart dimensions
const width = 900;
const height = 460;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function App() {
  fetch(urlGDP)
    .then((res) => res.json())
    .then((data) => {
      dataArr(data);
    });

  const dataArr = (arr) => {
    // create X and Y scales
    const xScale = d3
      .scaleUtc()
      .domain([
        d3.min(arr.data, (d) => new Date(d[0])),
        d3.max(arr.data, (d) => new Date(d[0])),
      ])
      .range([marginLeft, width - marginRight]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(arr.data, (d) => d[1])])
      .range([height - marginBottom, marginTop]);

    //create svg
    const svg = d3.select("article").select("svg").empty()
      ? d3.select("article").append("svg")
      : d3.select("article").select("svg");
    svg.attr("width", width).attr("height", height);

    // Create or select the g element for the x-axis
    const Xaxis = svg.select(".x-axis").empty()
      ? svg.append("g").attr("class", "x-axis")
      : svg.select(".x-axis");

    Xaxis.attr("transform", `translate(0,${height - marginBottom})`).call(
      d3.axisBottom(xScale)
    );

    // Create or select the g element for the y-axis
    const Yaxis = svg.select(".y-axis").empty()
      ? svg.append("g").attr("class", "y-axis")
      : svg.select(".y-axis");

    Yaxis.attr("transform", `translate(${marginLeft},0)`).call(
      d3.axisLeft(yScale)
    );
  };

  return (
    <section className="flex flex-col mt-6">
      <div id="title" className="mx-auto text-3xl text-blue-400">
        United States GDP
      </div>
      <article className="m-auto" />
    </section>
  );
}

export default App;
