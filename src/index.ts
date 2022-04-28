const isElement = (element: unknown): element is Element => {
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
  const children: Record<string, Element> = {};

  for (let index = 0; index < templateStringsArray.length; index++) {
    const value = values[index];
    const text = templateStringsArray[index];

    html += text;

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      html += value;
    }

    if (typeof value === "object") {
      if (!isElement(value)) {
        throw new Error(
          `Value must be a string, number, boolean or a DOM element`
        );
      }

      const key = `flyg-${index}`;
      children[key] = value;
      html += `<template id="${key}"></template>`;
    }
  }

  const component = createElementFromHTML<T>(html);

  Object.entries(children).forEach(([key, value]) => {
    (component as unknown as Element)
      .querySelector(`template#${key}`)
      .replaceWith(value);
  });

  return component;
};
