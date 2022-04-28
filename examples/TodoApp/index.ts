import { flyg } from "../../src";
import { Form, List } from "./components";

const TodoApp = (state) => {
  const list = List(state);

  const onSubmit = (value) => {
    state.push(value);
    list.actions.renderItems(state);
  };

  const component = flyg<HTMLElement>`
    <div>
        <h1>Todo</h1>
        <div>${Form({ onSubmit }).component}</div>
        ${list.component}
    </div>
`;

  return component;
};

document.body.appendChild(TodoApp(["Use flyg in your next project"]));
