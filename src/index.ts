const url = 'https://api.github.com/ussers?per_page=5';

// manejador de errores
const handleError = (res: Response) => {

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res;

};

const fetchPromise = fetch(url);

// fetchPromise
//     .then(res => res.json())
//     .then(data => console.log('data: ', data))
//     .catch(err => console.warn('error; ', err));

// para disparar catch, debemos aventar un error
// si el api no lo hace, necesitamos hacerlo manualmente
fetchPromise
    .then(handleError)
    .then(res => res.json())
    .then(data => console.log('data: ', data))
    .catch(err => console.warn('error; ', err));
