import * as d3 from "d3";

// dimensions
const width = 900;
const height = 630;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 80;

export default function App() {
  const ReferenceData = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dataArr(data);
      });
  };

  const dataArr = (arr) => {
    // create X scale
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(arr, (d) => d.Year - 1), d3.max(arr, (d) => d.Year)])
      .range([marginLeft, width - marginRight]);

    // Parse the Time values into Date objects
    const parseTime = d3.timeParse("%M:%S");
    arr.forEach((d) => {
      d.Time = parseTime(d.Time);
    });

    // create Y scale
    const yScale = d3
      .scaleLinear()
      .domain([d3.max(arr, (d) => d.Time), d3.min(arr, (d) => d.Time)])
      .range([height - marginBottom, marginTop]);

    // svg
    const svg = d3.select("#scatter-plot").select("svg").empty()
      ? d3.select("#scatter-plot").append("svg")
      : d3.select("#scatter-plot").select("svg");
    svg.attr("width", width).attr("height", height);
    // label y-axis
    svg
      .append("text")
      .attr("x", -240)
      .attr("y", 30)
      .attr("transform", "rotate(-90)")
      .attr("class", "text")
      .text("Time in Minutes");
    // circles
    svg
      .selectAll("circle")
      .data(arr)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => yScale(d.Time))
      .attr("r", 5)
      .attr("data-xvalue", (d) => d.Year)
      .attr('data-yvalue', (d) => (new Date(d.Time)).toISOString())

    // Add x-axis
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    // Add y-axis
    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")));
  };

  ReferenceData();
  return (
    <div id="scatter-plot" className="flex items-center flex-col mt-6 text-center ">
      <h1 id="title" className="text-3xl ml-24 ">
        Doping in Professional Bicycle Racing
      </h1>
    </div>
  );
}
