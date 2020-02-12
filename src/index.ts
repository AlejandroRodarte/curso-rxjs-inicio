const url = 'https://api.github.com/ussers?per_page=5';

const fetchPromise = fetch(url);

fetchPromise
    .then(res => res.json())
    .then(data => console.log('data: ', data))
    .catch(err => console.warn('error; ', err));
