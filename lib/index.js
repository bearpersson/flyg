"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flyg = void 0;
var htmlEncode = function (value) {
    return String(value).replace(/[^\w. ]/gi, function (char) {
        return "&#" + char.charCodeAt(0) + ";";
    });
};
var createElementFromHTML = function (html) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
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
        else if (typeof value === "object") {
            if (Array.isArray(value)) {
                for (var index = 0; index < value.length; index++) {
                    renderValue(value[index], "".concat(key, "-").concat(index));
                }
                return;
            }
            if (!(value instanceof Element)) {
                throw new Error("Value must be a string, number, boolean or a DOM element");
            }
            children[key] = value;
            html += "<template data-flyg=\"".concat(key, "\"></template>");
        }
    };
    for (var index = 0; index < templateStringsArray.length; index++) {
        html += templateStringsArray[index];
        renderValue(values[index], index.toString());
    }
    var component = createElementFromHTML(html);
    for (var key in children) {
        component
            .querySelector("template[data-flyg=\"".concat(key, "\"]"))
            .replaceWith(children[key]);
    }
    return component;
};
exports.flyg = flyg;
