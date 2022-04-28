import { flyg } from "../../../src";

export const List = (state) => {
  const component = flyg<HTMLElement>`<ul></ul>`;

  const actions = {
    renderItems: (state) => {
      component.innerHTML = state.map((i) => `<li>${i}</li>`).join("");
    },
  };

  actions.renderItems(state);

  return { component, actions };
};
