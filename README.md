# ✈️ Flyg

Flyg is a simple library for building components with javascript template literals. In addition to standard string interpolation, flyg offers the ability to interpolate dom elements and keeping its references for further manipulation and event binding.

## Installation

To install from npm:

```bash
npm i flyg
```

Import to project:

```ts
import { flyg } from "flyg";
```

## Examples

Create a component with a type:

```ts
const App = flyg<HTMLElement>`<div>Nice to see you 👋</div>`;

document.body.appendChild(App);
```

Combine components:

```ts
const ContactButton = ({ text }) => {
  const component = flyg<HTMLButtonElement>`
    <button>
        ${text}
    </button>`;

  component.addEventListener("click", () => {
    alert("Awesome ⭐️");
  });

  return component;
};

const App = flyg<HTMLElement>`
    <div>
        <h1>About</h1>
        <p>This is fun right?</p>
        <div>${ContactButton({ text: "📬 Contact me" })}</div>
    </div>
`;

document.body.appendChild(App);
```
