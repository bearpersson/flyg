"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
it("returns a element from a html string", function () {
    var component = (0, __1.flyg)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div>hello</div>"], ["<div>hello</div>"])));
    expect(component.outerHTML).toBe("<div>hello</div>");
});
it("returns a element from a html string with a string", function () {
    var component = (0, __1.flyg)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), "1");
    expect(component.outerHTML).toBe("<div>1</div>");
});
it("returns a element from a html string with a number", function () {
    var component = (0, __1.flyg)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), 1);
    expect(component.outerHTML).toBe("<div>1</div>");
});
it("returns a element from a html string with boolean", function () {
    var component = (0, __1.flyg)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), true);
    expect(component.outerHTML).toBe("<div>true</div>");
});
it("returns a element from a html string with multiple values in a row", function () {
    var component = (0, __1.flyg)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<div>", "", "</div>"], ["<div>", "", "</div>"])), 1, 2);
    expect(component.outerHTML).toBe("<div>12</div>");
});
it("returns a element from a html string with multiple values in diffrent locations", function () {
    var component = (0, __1.flyg)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    <div>", "", "<div>", "</div></div>"], ["\n    <div>", "", "<div>", "</div></div>"])), 1, 2, 3);
    expect(component.outerHTML).toBe("<div>12<div>3</div></div>");
});
it("returns a element from a html string with a element as a child", function () {
    var element = (0, __1.flyg)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<p>hey</p>"], ["<p>hey</p>"])));
    var component = (0, __1.flyg)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), element);
    expect(component.outerHTML).toBe("<div><p>hey</p></div>");
});
it("should return a element from a html string with multiple elements as children", function () {
    var element1 = (0, __1.flyg)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<p>hey</p>"], ["<p>hey</p>"])));
    var element2 = (0, __1.flyg)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<p>2</p>"], ["<p>2</p>"])));
    var component = (0, __1.flyg)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<div>", "<div>", "</div></div>"], ["<div>", "<div>", "</div></div>"])), element1, element2);
    expect(component.outerHTML).toBe("<div><p>hey</p><div><p>2</p></div></div>");
});
it("throws error if value differs from string, number, boolean and elements", function () {
    function createComponent() {
        (0, __1.flyg)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), {});
    }
    expect(createComponent).toThrowError("Value must be a string, number, boolean or a DOM element");
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
