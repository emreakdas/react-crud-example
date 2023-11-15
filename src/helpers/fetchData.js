export default function fetchData(url, success, error) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject();
    })
    .then(json => success(json))
    .catch(err => error());
}