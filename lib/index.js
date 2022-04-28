"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flyg = exports.createElementFromHTML = void 0;
var isElement = function (element) {
    return element instanceof Element;
};
var createElementFromHTML = function (html) {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};
exports.createElementFromHTML = createElementFromHTML;
var flyg = function (templateStringsArray) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var html = "";
    var children = {};
    for (var index = 0; index < templateStringsArray.length; index++) {
        var value = values[index];
        var text = templateStringsArray[index];
        html += text;
        if (typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean") {
            html += value;
        }
        if (typeof value === "object") {
            if (!isElement(value)) {
                throw new Error("Value must be a string, number, boolean or a DOM element");
            }
            var key = "flyg-".concat(index);
            children[key] = value;
            html += "<template id=\"".concat(key, "\"></template>");
        }
    }
    var component = (0, exports.createElementFromHTML)(html);
    Object.entries(children).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        component
            .querySelector("template#".concat(key))
            .replaceWith(value);
    });
    return component;
};
exports.flyg = flyg;
