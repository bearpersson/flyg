"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flyg = void 0;
var isElement = function (element) {
    return element instanceof Element;
};
var htmlEncode = function (value) {
    return String(value).replace(/[^\w. ]/gi, function (char) {
        return "&#" + char.charCodeAt(0) + ";";
    });
};
var createElementFromHTML = function (html) {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};
var flyg = function (templateStringsArray) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var html = "";
    var children = {};
    var renderValue = function (value, key) {
        if (typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean") {
            html += htmlEncode(value);
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (item, index) { return renderValue(item, "".concat(key, "-").concat(index)); });
                return;
            }
            if (!isElement(value)) {
                throw new Error("Value must be a string, number, boolean or a DOM element");
            }
            children[key] = value;
            html += "<template id=\"".concat(key, "\"></template>");
        }
    };
    for (var index = 0; index < templateStringsArray.length; index++) {
        var text = templateStringsArray[index];
        html += text;
        renderValue(values[index], "flyg-".concat(index));
    }
    var component = createElementFromHTML(html);
    Object.entries(children).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        component
            .querySelector("template#".concat(key))
            .replaceWith(value);
    });
    return component;
};
exports.flyg = flyg;
