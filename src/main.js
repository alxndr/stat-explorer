import "whatwg-fetch"; // global.fetch
import prettyMs from "pretty-ms";

import {pluralize, el, text, tag, checkStatus, parseJSON} from "./utils";

const now = new Date();

const compareStartDates = (a, b) => a.starts_on < b.starts_on ? -1 : a.starts_on == b.starts_on ? 0 : 1;

const maxOf = metric => (max, data) => data[metric] > max ? data[metric] : max;

function fetchToursData() {
  fetch("//phish.in/api/v1/tours?per_page=100").then(checkStatus).then(parseJSON)
    .then(({data: toursData}) => {
      const toursDataSorted = toursData.sort(compareStartDates);
      document.body.appendChild(
        tag.div(
          tag.h1(`In Phish's ${pluralize(toursData.length, "tour")}...`),
          tag.p(`The most shows they played in a tour was ${toursData.reduce(maxOf("shows_count"), 0)}.`)
        )
      );

      const tourUrls = toursDataSorted.map(tourData => `//phish.in/api/v1/tours/${tourData.id}`);
      Promise.all(tourUrls.map(tourUrl => fetch(tourUrl).then(checkStatus).then(parseJSON)))
        .then(promiseData => {
          const data = promiseData.map(d => d.data);
          const durationOfEachTour = data.map(tourData => tourData.shows.reduce((total, showData) => showData.duration + total, 0));
          document.body.appendChild(
            tag.div(
              tag.p(`Total duration played: ${prettyMs(durationOfEachTour.reduce((a, b) => a + b))}`)
            )
          );
        });
    });
}

window.main = function() {
  fetchToursData();
};
