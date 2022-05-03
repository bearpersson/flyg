const isElement = (element: unknown): element is Element => {
  return element instanceof Element;
};

const htmlEncode = (value) => {
  return String(value).replace(/[^\w. ]/gi, (char) => {
    return "&#" + char.charCodeAt(0) + ";";
  });
};

const createElementFromHTML = <T>(html: string): T => {
  const template = document.createElement("template");
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

  const renderValue = (value: unknown, key: string) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      html += htmlEncode(value);
    }

    if (typeof value === "object") {
      if(Array.isArray(value)) {
        value.forEach((item, index) => renderValue(item, `${key}-${index}`));
        return;
      }      

      if (!isElement(value)) {
        throw new Error(
          `Value must be a string, number, boolean or a DOM element`
        );
      }

      children[key] = value;
      html += `<template id="${key}"></template>`;
    }
  }

  for (let index = 0; index < templateStringsArray.length; index++) {
    const text = templateStringsArray[index];
    html += text;
    renderValue(values[index], `flyg-${index}`);
  }

  const component = createElementFromHTML<T>(html);    

  Object.entries(children).forEach(([key, value]) => {
    (component as unknown as Element)
      .querySelector(`template#${key}`)
      .replaceWith(value);
  });

  return component;
};
