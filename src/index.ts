const htmlEncode = (value) => {
  return String(value).replace(/[^\w. ]/gi, (char) => {
    return "&#" + char.charCodeAt(0) + ";";
  });
};

const createElementFromHTML = <T>(html: string): T => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
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
    } else if(typeof value === "object") {
      if(Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
          renderValue(value[index], `${key}-${index}`);
        }
        return;
      }      

      if (!(value instanceof Element)) {
        throw new Error(
          `Value must be a string, number, boolean or a DOM element`
        );
      }

      children[key] = value;
      html += `<template data-flyg="${key}"></template>`;
    }
  }

  for (let index = 0; index < templateStringsArray.length; index++) {
    html += templateStringsArray[index];
    renderValue(values[index], index.toString());
  }

  const component = createElementFromHTML<T>(html);    

  for (const key in children) {
    (component as unknown as Element)
      .querySelector(`template[data-flyg="${key}"]`)
      .replaceWith(children[key]);
  }
  
  return component;
};
