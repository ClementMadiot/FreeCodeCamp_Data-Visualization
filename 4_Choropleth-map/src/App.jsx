const App = () => {
  const educationData = () => {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const countyData = () => {
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
