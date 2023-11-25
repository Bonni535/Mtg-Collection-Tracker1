const endpoint = 'https://mtg-collection-tracker-default-rtdb.firebaseio.com/';

const getCollections = (uid) => new Promise((resolve, reject) => {
  console.warn(endpoint, 'endpoint');
  fetch(`${endpoint}/collections.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteCollection = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleCollection = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createCollection = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCollection = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collections/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCollections,
  createCollection,
  deleteCollection,
  getSingleCollection,
  updateCollection,
};
