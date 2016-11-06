"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var now = new Date();

var jsonp = function jsonp(url, callback) {
  var callbackName = "callback" + Math.random().toString().replace(".", "");
  var scriptEl = document.createElement("script");
  window[callbackName] = function () {
    document.body.removeChild(scriptEl);
    return callback.apply(undefined, arguments);
  };
  var scriptUrl = "" + url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callbackName;
  scriptEl.setAttribute("src", scriptUrl);
  document.body.appendChild(scriptEl);
};
var ak = { a: [61, 70, 69, "6B", 65, 79], b: [31, 45, 42, 41, 32, 30, 36, 39, 35, 38, 46, 39, 34, 44, 36, 34, 46, 43, 41, 33] };
var encodeData = function encodeData(data) {
  return Object.keys(data).map(function (key) {
    return [key, data[key]].join("=");
  }).join("&");
};
var ef = function ef(arr) {
  return eval("\"" + arr.map(function (x) {
    return "\\x" + x;
  }).join("") + "\"");
};
var pnetUrl = function pnetUrl(params) {
  return "https://api.phish.net/api.js?" + encodeData(params);
};
var fetchPnet = function fetchPnet(params, callback) {
  jsonp(pnetUrl(Object.assign({}, params, _defineProperty({}, ef(ak.a), ef(ak.b)))), callback);
};

var checkStatus = function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
};
var parseJSON = function parseJSON(response) {
  return response.json();
};

var el = function el(tagName) {
  for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  var element = document.createElement(tagName);
  if (children) {
    if (children.length === 1) {
      element.appendChild(children[0]);
    } else {
      children.map(element.appendChild.bind(element));
    }
  }
  return element;
};
var text = function text(content) {
  var sanitized = content.replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
  return document.createTextNode(sanitized);
};
var tag = {
  // holder of helper functions for creating common HTML elements
  div: function div() {
    for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    return el.apply(undefined, ["div"].concat(children));
  }
};
["h1", "h2", "p"].forEach(function (tagName) {
  tag[tagName] = function (content) {
    return el(tagName, text(content));
  };
});

var compareStartDates = function compareStartDates(a, b) {
  return a.starts_on < b.starts_on ? -1 : a.starts_on == b.starts_on ? 0 : 1;
};
var pluralize = function pluralize(count, term) {
  return count + " " + term + (count === 1 ? "" : "s");
};

function doIt() {
  fetch("http://phish.in/api/v1/tours?per_page=100").then(checkStatus).then(parseJSON).then(function (_ref) {
    var toursData = _ref.data;

    console.log("toursData", toursData);
    var toursDataSorted = toursData.sort(compareStartDates);
  });
}

window.main = function () {
  console.log("wheee");
  doIt();
};