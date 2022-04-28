import { flyg } from "../../../src";

export const Form = ({ onSubmit }) => {
  const textInput = flyg<HTMLInputElement>`<input type="text"></input>`;
  const component = flyg<HTMLFormElement>`
      <form>
        ${textInput}      
        <button type="submit">Add todo</button>
      </form>
    `;

  component.addEventListener("submit", (event) => {
    event.preventDefault();

    if (textInput.value === "") {
      return;
    }

    onSubmit(textInput.value);
    textInput.value = "";
  });

  return { component };
};
