export default function actionData(url, method, body, success, error, finalyCallback = (() => {})) {
  fetch(url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject();
    })
    .then((json) => success(json))
    .catch(() => error())
    .finally(() => finalyCallback());
}
