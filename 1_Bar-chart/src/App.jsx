import * as d3 from "d3";
// import { useEffect } from "react";

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
      // console.log(data);
    });

  const dataArr = (arr) => {
    //* create X and Y scales
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

    //* create svg
    const svg = d3.select("article").select("svg").empty()
      ? d3.select("article").append("svg")
      : d3.select("article").select("svg");
    svg.attr("width", width).attr("height", height);

    // Create or select the g element for the x-axis
    const Xaxis = svg.select("#x-axis").empty()
      ? svg.append("g").attr("id", "x-axis")
      : svg.select(".x-axis");

    Xaxis.attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(xScale))
      .attr("class", "tick");

    // Create or select the g element for the y-axis
    const Yaxis = svg.select("#y-axis").empty()
      ? svg.append("g").attr("id", "y-axis")
      : svg.select(".y-axis");

    Yaxis.attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale))
      .attr("class", "tick");

    // Create the bars
    svg
      .selectAll("rect")
      .data(arr.data)
      .enter()
      .append("rect")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("class", "bar")
      .attr("x", (d) => xScale(new Date(d[0])))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", 3)
      .attr("height", (d) => height - marginBottom - yScale(d[1]))
      .attr("fill", "#60a5fa")
      .on("mouseover", (e, d) => handleMouseOver(e, d));
  };

  const handleMouseOver = (e, d) => {
    // Check if d is undefined
    if (typeof d === 'undefined') return; // Exit the function early

    const updateTooltip = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      // console.log("Mouse coordinates:", x, y);
      // console.log("Data:", d); // Log the data to check its format

      // create the tooltip
      const tooltip = d3.select("article").select("#tooltip").empty()
        ? d3.select("article").append("div")
        : d3.select("article").select("div");

      tooltip
        .attr("id", "tooltip")
        .attr("data-date", d[0])
        .style("left", `${x + 10}px`) // Position tooltip 10px to the right of the cursor
        .style("top", `${y - 60}px`)
        .html(
          `<p><strong>Date:</strong> ${d[0]}</p><br><p><strong>GDP:</strong> $${d[1]} Billion</p>`
        )
        .attr("class", "tooltip");
    };

    // Initial tooltip creation
    updateTooltip(e);

    // Add mousemove event listener to update tooltip position
    d3.select("article").on("mousemove", updateTooltip);
  };

  // Remove the mousemove event listener when the mouse leaves the element
  const handleMouseOut = () => {
    d3.select("article").on("mousemove", null);
  };

  // Attach the event listeners
  d3.selectAll("rect")
    .on("mouseover", (e, d) => handleMouseOver(e, d))
    .on("mouseout", handleMouseOut);

  return (
    <section className="flex flex-col mt-6 relative">
      <div id="title" className="mx-auto text-3xl text-blue-400">
        United States GDP
      </div>
      <article className="ml-24" onMouseMove={handleMouseOver} />
    </section>
  );
}

export default App;
