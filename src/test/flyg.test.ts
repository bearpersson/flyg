import { flyg } from "..";

it("returns a component from a html string", () => {
  const component = flyg<HTMLElement>`<div>hello</div>`;
  expect(component.outerHTML).toBe("<div>hello</div>");
});
it("returns a component from a html string with a string", () => {
  const component = flyg<HTMLElement>`<div>${"1"}</div>`;
  expect(component.outerHTML).toBe("<div>1</div>");
});
it("returns a component from a html string with a number", () => {
  const component = flyg<HTMLElement>`<div>${1}</div>`;
  expect(component.outerHTML).toBe("<div>1</div>");
});

it("returns a component from a html string with boolean", () => {
  const component = flyg<HTMLElement>`<div>${true}</div>`;
  expect(component.outerHTML).toBe("<div>true</div>");
});

it("returns a component from a html string with multiple values in a row", () => {
  const component = flyg<HTMLElement>`<div>${1}${2}</div>`;
  expect(component.outerHTML).toBe("<div>12</div>");
});

it("returns a component from a html string with multiple values spread out", () => {
  const component = flyg<HTMLElement>`
    <div>${1}${2}<div>${3}</div></div>`;
  expect(component.outerHTML).toBe(`<div>12<div>3</div></div>`);
});

it("returns a component from a html string with a component", () => {
  const element = flyg<HTMLElement>`<p>hey</p>`;
  const component = flyg<HTMLElement>`<div>${element}</div>`;
  expect(component.outerHTML).toBe("<div><p>hey</p></div>");
});

it("should return a component from a html string with multiple components", () => {
  const element1 = flyg<HTMLElement>`<p>hey</p>`;
  const element2 = flyg<HTMLElement>`<p>2</p>`;
  const component = flyg<HTMLElement>`<div>${element1}<div>${element2}</div></div>`;
  expect(component.outerHTML).toBe("<div><p>hey</p><div><p>2</p></div></div>");
});

it("throws errors if the value is not a component", () => {
  function createComponent() {
    flyg<HTMLElement>`<div>${{}}</div>`;
  }
  expect(createComponent).toThrowError(
    "Value must be a string, number, boolean or a DOM element"
  );
});