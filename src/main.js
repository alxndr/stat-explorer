import {pluralize} from "./utils";

const now = new Date();

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};
const parseJSON = (response) => {
  return response.json();
};

const el = (tagName, ...children) => {
  const element = document.createElement(tagName);
  if (children) {
    if (children.length === 1) {
      element.appendChild(children[0]);
    } else {
      children.map(element.appendChild.bind(element));
    }
  }
  return element;
};
const text = (content) => {
  const sanitized = content.replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
  return document.createTextNode(sanitized);
};
const tag = {
  // holder of helper functions for creating common HTML elements
  div: (...children) => el("div", ...children)
};
["h1", "h2", "p"].forEach((tagName) => {
  tag[tagName] = (content) => el(tagName, text(content));
});

const compareStartDates = (a, b) => a.starts_on < b.starts_on ? -1 : a.starts_on == b.starts_on ? 0 : 1;

function fetchToursData() {
  fetch(`http://phish.in/api/v1/tours?per_page=100`)
    .then(checkStatus)
    .then(parseJSON)
    .then(({data: toursData}) => {
      console.log("toursData", toursData);
      const toursDataSorted = toursData.sort(compareStartDates);
      document.body.appendChild(
        tag.div(
          tag.h1(`In Phish's ${pluralize(toursData.length, "tour")}...`),
          tag.p(`The most shows they played in a "tour" was ${/*toursData.reduce(max("shows_count"))*/"?"}`)
        )
      );
    });
}

window.main = function() {
  fetchToursData();
};
