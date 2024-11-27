import React from "react";
import * as d3 from "d3";

// dimensions
const width = 900;
const height = 630;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 60;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
].reverse();  

const App = () => {
  const datafetch = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    )
      .then((res) => res.json())
      .then((data) => {
        displayMap(data);
      });
  };

  const displayMap = (data) => {
    console.log(data);

    const svg = d3.select("body").append("svg").empty()
      ? d3.select("body").append("svg")
      : d3.select("body").select("svg");

    const xSclale = d3
      .scaleLinear()
      .domain(d3.extent(data.monthlyVariance, (d) => d.year))
      .range([marginLeft, width - marginRight]);

    const yScale = d3
      .scaleBand()
      .domain(monthNames)
      .range([height - marginBottom, marginTop]);

    const axis = (svg) => {
      // Add x-axis
      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(xSclale).tickFormat(d3.format("d")));

      // Add y-axis
      svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(d3.axisLeft(yScale));
    };
    axis(svg);
  };

  datafetch();
  return (
    <>
      <h1 id="title" className="text-center text-2xl mt-6 mb-4 font-semibold">
        Monthly Global Land-Surface Temperature
      </h1>
      <p id="description" className="text-center text-xl font-semibold">
        1753 - 2015: base temperature 8.66℃
      </p>
    </>
  );
};

export default App;
