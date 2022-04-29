import { flyg } from "../../../src";

export const List = (state) => {
  const component = flyg<HTMLElement>`<ul></ul>`;

  state.map((i) => {
    component.appendChild(flyg<HTMLElement>`<li>${i}</li>`);
  });

  const actions = {
    renderItems: () => {
      component.innerHTML = "";
      state.map((i) => {
        component.appendChild(flyg<HTMLElement>`<li>${i}</li>`);
      });
    },
  };

  actions.renderItems();

  return { component, actions };
};
