(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var now = new Date();

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

function fetchToursData() {
  fetch("http://phish.in/api/v1/tours?per_page=100").then(checkStatus).then(parseJSON).then(function (_ref) {
    var toursData = _ref.data;

    console.log("toursData", toursData);
    var toursDataSorted = toursData.sort(compareStartDates);
    document.body.appendChild(tag.div(tag.h1("In Phish's " + (0, _utils.pluralize)(toursData.length, "tour") + "..."), tag.p("The most shows they played in a \"tour\" was " + /*toursData.reduce(max("shows_count"))*/"?")));
  });
}

window.main = function () {
  fetchToursData();
};

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pluralize = exports.pluralize = function pluralize(count, term) {
  return count + " " + term + (count === 1 ? "" : "s");
};

},{}]},{},[1,2]);
