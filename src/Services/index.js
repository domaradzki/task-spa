const url = "https://jsonplaceholder.typicode.com";

export const getAlbumsPromise = () =>
  fetch(url + "/albums").then(response => response.json());

export const getPhotosPromise = () =>
  fetch(url + "/photos").then(response => response.json());

export const getUsersPromise = () =>
  fetch(url + "/users").then(response => response.json());
