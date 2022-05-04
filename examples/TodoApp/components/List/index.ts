import { flyg } from "../../../../src";

export const List = (todos) => {
  const component = flyg<HTMLElement>`<ul></ul>`;

  const actions = {
    renderItems: () => {
      component.innerHTML = "";
      todos.map((todo) => {
        component.appendChild(flyg<HTMLElement>`<li>${todo}</li>`);
      });
    },
  };

  actions.renderItems();

  return { component, actions };
};
