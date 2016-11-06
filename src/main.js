import {pluralize, el, text, tag} from "./utils";

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

const compareStartDates = (a, b) => a.starts_on < b.starts_on ? -1 : a.starts_on == b.starts_on ? 0 : 1;

function fetchToursData() {
  // TODO this is still a bare `fetch` in the bundled js
  fetch("//phish.in/api/v1/tours?per_page=100")
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
