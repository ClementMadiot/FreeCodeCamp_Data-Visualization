import * as d3 from "d3";
import * as topojson from "topojson-client";

// dimensions
const width = 900;
const height = 600;
const marginTop = 20;
const marginBottom = 30;
const marginRight = 20;
const marginLeft = 60;

const App = () => {
  const educationData = () => {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };
  const countyData = () => {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displayCounty(data);
      });
  };

  const displayCounty = (data) => {
    console.log(data);
    d3.select("body").select("svg").remove();

    const svg = d3
      .select("body")
      .append("svg")
      .style("width", width)
      .style("height", height);

    const color = d3
      .scaleThreshold()
      .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
      .range(d3.schemeGreens[9]);

    const path = d3.geoPath();

    const counties = (svg, data) => {
      svg
        .append("g")
        .attr("id", "counties")
        .selectAll("path")
        .data(topojson.feature(data, data.objects.counties).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "county")
        .attr("data-fips", (d) => d.id);
    };
    counties(svg, data);

    const states = (svg, data) => {
      svg
        .append("g")
        .attr("id", "states")
        .append("path")
        .datum(topojson.mesh(data, data.objects.states, (a, b) => a !== b))
        .attr("class", "state")
        .attr("d", path);
    };
    states(svg, data);

    const legend = (svg) => {
      const xScale = d3
        .scaleLinear()
        .domain([2.6, 75.1])
        .rangeRound([600, 860]);

      const gLegend = svg
        .append("g")
        .attr("id", "legend")
        .attr("transform", "translate(-20, 45)");

      let legendData = color.range().map((d) => {
        const extent = color.invertExtent(d);
        if (extent[0] === null) extent[0] = xScale.domain()[0];
        if (extent[1] === null) extent[1] = xScale.domain()[1];
        return extent;
      });

      gLegend
        .selectAll("rect")
        .data(legendData.slice(0, -1))
        .enter()
        .append("rect")
        .attr("height", 8)
        .attr("x", (d) => xScale(d[0]))
        .attr("width", (d) =>
          d[0] && d[1] ? xScale(d[1]) - xScale(d[0]) : xScale(null)
        )
        .attr("width", function (d) {
          return d[0] && d[1] ? xScale(d[1]) - xScale(d[0]) : xScale(null);
        })
        .attr("fill", (d) => color(d[0]));

      gLegend
        .append("text")
        .attr("class", "caption")
        .attr("x", xScale.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Legend");

      gLegend.call(
        d3
          .axisBottom(xScale)
          .tickSize(13)
          .tickFormat((x) => Math.round(x) + "%")
          .tickValues(color.domain())
      );
    };

    legend(svg);
  };

  countyData();
  educationData();
  return (
    <>
      <div className="space-y-4 mt-4 text-center">
        <h1 id="title" className="text-3xl font-semibold">
          United States Educational Attainment
        </h1>
        <p id="description" className="text-lg">
          Percentage of adults age 25 and older with a bachelor's degree or
          higher (2010-2014)
        </p>
      </div>
    </>
  );
};

export default App;
