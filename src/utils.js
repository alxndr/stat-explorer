// string helpers

export const pluralize = (count, term) => `${count} ${term}${count === 1 ? "" : "s"}`;

// html helpers

export const el = (tagName, ...children) => {
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

export const text = (content) => {
  const sanitized = content.replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
  return document.createTextNode(sanitized);
};

export const tag = {
  // holder of helper functions for creating common HTML elements
  div: (...children) => el("div", ...children)
};
["h1", "h2", "p"].forEach((tagName) => {
  tag[tagName] = (content) => el(tagName, text(content));
});

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};
export const parseJSON = (response) => {
  return response.json();
};
