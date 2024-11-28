import * as d3 from "d3";

// dimensions
const width = 1400;
const height = 430;
const marginTop = 20;
const marginBottom = 30;
const marginRight = 20;
const marginLeft = 60;

// month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].reverse();

const App = () => {
  const datafetch = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    )
      .then((res) => res.json())
      .then((data) => {
        displayMap(data.monthlyVariance);
      });
  };

  const displayMap = (data) => {
    // console.log(data);
    // Remove existing SVG if it exists
    d3.select("body").select("svg").remove();

    const svg = d3.select("body").append("svg").style('width', width)

    const xSclale = d3
      .scaleLinear()
      // .domain([d3.min(data, (d) => d.year - 1), d3.max(data, (d) => d.year)])
      .domain(d3.extent(data, (d) => d.year))
      .range([marginLeft, width - marginRight]);

    const yScale = d3
      .scaleBand()
      .domain(monthNames)
      .range([height - marginBottom, marginTop]);

    const axis = (svg) => {
      svg.select("#x-axis").remove();
      svg.select("#y-axis").remove();

      // Add x-axis
      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(
          d3
          .axisBottom(xSclale)
          .tickFormat(d3.format("d"))
          .ticks(20)
        );

      // Add y-axis
      svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(d3.axisLeft(yScale));
    };
    axis(svg);

    const rect = (svg, data) => {
      svg
        .append("g")
        .attr("id", "map")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("x", (d) => xSclale(d.year))
        .attr("y", (d) => yScale(monthNames[12 - d.month]))
        .attr("width", 5)
        .attr("height", 30)
        .attr("data-month", (d) => d.month - 1)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => 8.66 - d.variance)
        .attr("fill", (d) => {
          if (8.66 - d.variance >= 12.8) return "#D73027";
          if (8.66 - d.variance >= 11.7) return "#D73027";
          if (8.66 - d.variance >= 10.6) return "#F46D43";
          if (8.66 - d.variance >= 9.5) return "#FDAE61";
          if (8.66 - d.variance >= 8.3) return "#FEE090";
          if (8.66 - d.variance >= 7.2) return "#FFFFBF";
          if (8.66 - d.variance >= 6.1) return "#E0F3F8";
          if (8.66 - d.variance >= 5.0) return "#ABD9E9";
          if (8.66 - d.variance >= 3.9) return "#74ADD1";
          return "#4575B4";
        })
        .on("mouseover", (e, data) => handleMouseOver(e, data))
        .on("mouseout", handleMouseOut);
    };
    rect(svg, data);

    const legend = (svg) => {
      const dataTemp = [
        { value: 2.8, color: "#4575B4" },
        { value: 3.9, color: "#74ADD1" },
        { value: 5.0, color: "#ABD9E9" },
        { value: 6.1, color: "#E0F3F8" },
        { value: 7.2, color: "#FFFFBF" },
        { value: 8.3, color: "#FEE090" },
        { value: 9.5, color: "#FDAE61" },
        { value: 10.6, color: "#F46D43" },
        { value: 11.7, color: "#D73027" },
        { value: 12.8, color: "#D73027" },
      ];

      // Remove existing legend if it exists
      svg.select("#legend").remove();

      const legendGroup = svg
        .append("g")
        .attr("id", "legend")
        .attr("transform", `translate(100, 460)`);

      dataTemp.forEach((x, i) => {
        legendGroup
          .append("rect")
          .attr("x", x.value * 40) // Adjust the multiplier as needed for spacing
          .attr("y", 10)
          .attr("width", 36)
          .attr("height", 36)
          .attr("fill", x.color);
      });

      dataTemp.forEach((x) => {
        legendGroup
          .append("g")
          .attr("class", "tick")
          .attr("transform", `translate(${x.value * 40 + 15}, 50)`)
          .append("text")
          .text(x.value.toFixed(1))
          .attr("dy", "0.71em")
          .attr("y", 6)
          .attr("x", 0)
          .style("text-anchor", "middle");
      });
    };

    legend(svg);
  };

  const handleMouseOver = (e, data) => {
    const splitData = data.variance.toFixed(2);
    const calculetedData = (8.66 - splitData).toFixed(2);

    const y = e.clientY;
    const x = e.clientX;

    let tooltip = d3.select("body").select("#tooltip");
    if (tooltip.empty()) {
      tooltip = d3.select("body").append("div").attr("id", "tooltip");
    }

    tooltip
      .style("left", `${x + -45}px`)
      .style("top", `${y + -140}px`)
      .style("opacity", 0.9)
      .attr("data-year", data.year).html(`
      <p className="tooltip-year">${data.year} - ${
      monthNames[12 - data.month]
    }</p>
      <p className="tooltip-temp">${splitData}℃</p>
      <p className="tooltip-temp">${calculetedData}℃</p>
      `);
  };

  const handleMouseOut = () => {
    d3.select("body").select("#tooltip").style("opacity", 0);
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
