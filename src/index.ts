const isElement = (element: unknown) => {
  return element instanceof Element;
};

export const createElementFromHTML = <T>(html: string): T => {
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild as unknown as T;
};

export const flyg = <T>(
  templateStringsArray: TemplateStringsArray,
  ...values: unknown[]
) => {
  let html = ``;
  const children: Record<number, HTMLElement> = {};

  for (let index = 0; index < templateStringsArray.length; index++) {
    const text = templateStringsArray[index];

    html += text;

    if (
      typeof values[index] === "string" ||
      typeof values[index] === "number" ||
      typeof values[index] === "boolean"
    ) {
      html += values[index];
    }

    if (typeof values[index] === "object") {
      if (!isElement(values[index])) {
        throw new Error(
          `Value must be a string, number, boolean or a DOM element`
        );
      }

      const key = `flyg-${index}`;
      children[key] = values[index];
      html += `<template id="${key}"></template>`;
    }
  }

  const component = createElementFromHTML<T>(html);

  Object.entries(children).forEach(([key, value]) => {
    (component as unknown as HTMLElement)
      .querySelector(`template#${key}`)
      .replaceWith(value);
  });

  return component;
};
