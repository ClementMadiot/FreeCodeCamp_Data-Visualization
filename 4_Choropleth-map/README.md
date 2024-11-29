<div align="center">
  <a href="https://fcc-heat-map-cm.netlify.app/" target="_blanck"><img src="./public/validation-Heat-Map.png" alt="Heat Map"></a>
   <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
</div>
  <h3 align="center">Visualize Data with a Choropleth Map</h3>
</div>

## <br /> 📋 <a name="table">Summary</a>

- ✨ [Introduction](#introduction)
- 🛠 [Technology Used](#tech-stack)
- 🚀 [Launch App](#launch-app)
- 🎨 [Styling](#style)


## <br /> <a name="introduction">✨ Introduction</a>

Fourth project FreeCodeCamp to valid the certification "Data Visualization"

**User Story :**

# Technology Stack

- User Story #1: My choropleth should have a title with a corresponding id="title".

- User Story #2: My choropleth should have a description element with a corresponding id="description".

# Content

- User Story #3: My choropleth should have counties with a corresponding class="county" that represent the data.

- User Story #4: There should be at least 4 different fill colors used for the counties.

- User Story #5: My counties should each have data-fips and data-education properties containing their corresponding fips and education values.

- User Story #6: My choropleth should have a county for each provided data point.

- User Story #7: The counties should have data-fips and data-education values that match the sample data.

- User Story #8: My choropleth should have a legend with a corresponding id="legend".

- User Story #9: There should be at least 4 different fill colors used for the legend.

# TooltipTests

- User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

- User Story #11: My tooltip should have a data-education property that corresponds to the data-education of the active area.

# Dataset

> dataset to complete this project: 

> - US Education Data:https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json
> - US County Data:https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json


## <br /> <a name="tech-stack">🛠 Technology Used</a>

- [TailwindCSS](https://tailwindcss.com/docs/installation)
  Tailwind CSS is a valuable tool for developers who want to build modern, responsive, and visually appealing websites without sacrificing development speed.

- [D3.js](https://www.npmjs.com/package/d3)
D3 (or D3.js) is a free, open-source JavaScript library for visualizing data. Its low-level approach built on web standards offers unparalleled flexibility in authoring dynamic, data-driven graphics.

## <br /> <a name="launch-app">🚀 Launch App</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

> [!NOTE]
> Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) _(Node Package Manager)_

**Cloning the Repository**

```bash
git clone {git remote URL}
cd {git project..}
```

**Installation**

> After cloning the repository, run the command `npm i` or `yarn i` to install the project's dependencies.

_npm_

```
npm install
```

_yarn_

```
yarn install
```

> Once the dependencies are installed, start the project with the command `npm run dev`.

## <br /> <a name="style">🎨 Styling</a>

Global styling are defined using **CSS** & **TailwindCSS**

<details>
<summary><code>index.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;


```
</details>

<details>
<summary><code>tailwind.config.js</code></summary>

````cjs
theme: {
    extend: {
      colors:{
        white: '#ffffffde',
        black:{
          100: '#212121de',
          200: '#121212'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
````

</details>