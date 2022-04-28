# ✈️ Flyg

Flyg is a simple library for building components with javascript.

## Installation

To install from npm:

```bash
npm i flyg
```

Import to project:

```ts
import { flyg } from "flyg";
```

## Exampels

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
