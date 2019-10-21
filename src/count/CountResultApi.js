import axios from "axios";

export function getResults() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/record/stocktaking`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}
