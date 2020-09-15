import axios from "axios";
import { pick } from "lodash/object";

export function getRecords(pageNumber = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/record?pageNumber=${pageNumber}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

// apply search
export function searchRecords(searchValue, pageNumber = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/record/search?pageNumber=${pageNumber}&searchValue=${searchValue}`
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function getRecordById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/record/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function createRecord(record) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/record/createrecord", record)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          if (response.status === 201) {
            // console.log(response.data);
            reject(response);
          } else {
            resolve(response);
          }
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function updateRecord(id, record) {
  const data = pick(record, [
    "model",
    "location",
    "version",
    "date",
    "isTPG",
    "isNZ",
    "quantity",
  ]);
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/record/${id}`, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function deleteRecord(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/record/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}
