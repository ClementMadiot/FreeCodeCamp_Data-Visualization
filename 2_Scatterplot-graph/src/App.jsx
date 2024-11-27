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
        // console.log(data);
        createChart(data);
      });
  };

  const createChart = (arr) => {
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

    // circles
    const circle = (svg, arr) => {
      svg
        .selectAll("circle")
        .data(arr)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("fill", d => d.Doping ? "blue" : "orange")
        .attr("cx", (d) => xScale(d.Year))
        .attr("cy", (d) => yScale(d.Time))
        .attr("r", 5)
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => new Date(d.Time).toISOString())
        .on("mousemove", (e, d) => handleMouseMove(e, d))
        .on("mouseout", handleMouseOut);
    };
    circle(svg, arr);

    // x-axis and y-axis
    const axis = (svg) => {
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
    axis(svg);

    const legend = (svg) => {
      //text
      svg.append("text").attr("class", "text").text("Time in Minutes");

      const legendData = [
        {
          color: "orange",
          text: "No doping allegations",
        },
        {
          color: "blue",
          text: "Riders with doping allegations",
        },
      ];

      // legend
      const legendGroup = svg.append("g").attr("id", "legend");

      legendData.map((item, index) => {
        const legendItem = legendGroup
          .append("g")
          .attr("class", "legend-label");

        legendItem
          .append("rect")
          .attr("class", "legend-rect")
          .attr("x", 880)
          .attr("y", 25 + index * 30)
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", item.color);

        legendItem
          .append("text")
          .attr("class", "legend-text")
          .attr("x", 60 - index * 45)
          .attr("y", 25 + index * 30)
          .text(item.text);
      });
    };
    legend(svg);
  };

  const handleMouseMove = (e, arr) => {
    console.log(arr);

    const x = e.clientX;
    const y = e.clientY;

    const date = new Date(arr.Time);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = `${minutes}:${seconds}`;

    // Check if the div with id 'tooltip' already exists
    let div = d3.select("#scatter-plot").select("#tooltip");
    if (div.empty()) {
      div = d3.select("#scatter-plot").append("div").attr("id", "tooltip");
    }

    div
      .style("opacity", 0.9)
      .style("left", `${x + 20}px`)
      .style("top", `${y + -30}px`)
      .style("opacity", 0.9)
      .html(
        `
      <p>${arr.Name}: ${arr.Nationality}</p>
      <p>Year: ${arr.Year}, Time: ${formattedTime}</p>
      ${arr.Doping ? `<br /><p>${arr.Doping}</p>` : ""}
      `
      )
      .attr("data-year", arr.Year);
  };

  const handleMouseOut = () => {
    d3.select("#scatter-plot").select("#tooltip").style("opacity", 0);
  }

  ReferenceData();
  return (
    <div
      id="scatter-plot"
      className="flex items-center flex-col mt-6 text-center"
    >
      <h1 id="title" className="text-3xl ml-24 font-semibold mb-4">
        Doping in Professional Bicycle Racing
      </h1>
    </div>
  );
}
