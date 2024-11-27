<div align="center">
  <a href="" target="_blanck"><img src="./public" alt="Heat Map"></a>
   <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
</div>
  <h3 align="center">Visualize Data with a Heat Map</h3>
</div>

## <br /> 📋 <a name="table">Summary</a>

- ✨ [Introduction](#introduction)
- 🛠 [Technology Used](#tech-stack)
- 🚀 [Launch App](#launch-app)
- 🎨 [Styling](#style)


## <br /> <a name="introduction">✨ Introduction</a>

Third project FreeCodeCamp to valid the certification "Data Visualization"

**User Story :**

# Technology Stack

- User Story #1: My heat map should have a title with a corresponding id="title". ✅

# Content

- User Story #2: My heat map should have a description with a corresponding id="description". ✅

- User Story #3: My heat map should have an x-axis with a corresponding id="x-axis". ✅

- User Story #4: My heat map should have a y-axis with a corresponding id="y-axis". ✅

- User Story #5: My heat map should have rect elements with a class="cell" that represent the data. ✅

- User Story #6: There should be at least 4 different fill colors used for the cells. ❌

- User Story #7: Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values. ✅

- User Story #8: The data-month, data-year of each cell should be within the range of the data. ✅

- User Story #9: My heat map should have cells that align with the corresponding month on the y-axis. ❌

- User Story #10: My heat map should have cells that align with the corresponding year on the x-axis. ✅

- User Story #11: My heat map should have multiple tick labels on the y-axis with the full month name. ✅

- User Story #12: My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015. ✅

- User Story #13: My heat map should have a legend with a corresponding id="legend". ✅

- User Story #14: My legend should contain rect elements. ✅

- User Story #15: The rect elements in the legend should use at least 4 different fill colors. ✅
 

# TooltipTests

- User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

- User Story #17: My tooltip should have a data-year property that corresponds to the data-year of the active area.

# Dataset

> dataset to complete this project: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json


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

@layer base {
  body {
    @apply text-black-100 bg-white font-inter;
  }
}

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