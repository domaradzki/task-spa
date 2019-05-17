const url = "https://jsonplaceholder.typicode.com";

export const getAlbumsPromise = () =>
  fetch(url + "/albums").then(response => response.json());

export const getPhotosPromise = (id) =>
  fetch(url + `/photos?albumId=${id}`).then(response => response.json());

export const getUsersPromise = () =>
  fetch(url + "/users").then(response => response.json());

  export const getAlbumPromise = (id) =>
  fetch(url + `/albums/${id}`).then(response => response.json());
