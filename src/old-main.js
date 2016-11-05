diff --git a/src/main.js b/src/main.js
deleted file mode 100644
index 812c40a..0000000
--- a/src/main.js
+++ /dev/null
@@ -1,52 +0,0 @@
const randomCallbackName = () => `callback${Math.random().toString().replace(".", "")}`;

const jsonp = (url, callback) => {
  // Hack to enable jsonp by writing a <script> element with a specific callback parameter.
  // Will remove the <script> element and callback function when the data arrives.
  const callbackName = randomCallbackName();
  const scriptEl = document.createElement("script");
  window[callbackName] = (...args) => {
    document.body.removeChild(scriptEl);
    delete window[callbackName];
    return callback(...args);
  };
  scriptEl.setAttribute("src", `${url}${url.indexOf("?") > -1 ? "&" : "?"}callback=${callbackName}`);
  document.body.appendChild(scriptEl);
};

const encodeData = (data) => Object.keys(data).map((key) => [key, data[key]].map(encodeURIComponent).join("=")).join("&");

const pnet = (params) => `https://api.phish.net/api.js?${encodeData(params)}`;

const el = (tagName, child=undefined) => {
  const element = document.createElement(tagName);
  if (child) {
    element.appendChild(child);
  }
  return element;
};
const text = (content) => {
  const n = document.createElement("span");
  n.innerHTML = content;
  return n;
};

jsonp(
  pnet({method: "pnet.shows.setlists.tiph"}),
  (data) => {
    const tiph = data[0];
    document.body.appendChild(
      el("div",
         text(`Today in Phish History: ${tiph.nicedate} at ${tiph.venue} in ${tiph.city}, ${tiph.state}: ${tiph.setlistnotes}`)
        )
    );
  }
);

function main() {
  console.log("you did the thing!");
}

window.main = main;

export default main;
