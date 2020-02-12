import { ajax, AjaxError } from 'rxjs/ajax';
import { map, pluck, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

const url = 'https://httpbin.org/delay/1';

// get: url y headers
ajax.get(url, { 'Content-Type': 'application/json' });

// post & put: url, cuerpo y headers
ajax.post(url, {
    id: 1,
    nombre: 'Fernando'
}, { 
    'Content-Type': 'application/json',
    'Mi-Token': 'abc123' 
});

ajax.put(url, {
    id: 1,
    nombre: 'Fernando'
}, { 
    'Content-Type': 'application/json',
    'Mi-Token': 'abc123' 
});

// delete: url y headers
ajax.delete(url, { 'Content-Type': 'application/json' });

// peticiones con verbos dinamicos y mas granularidad y control en el tipo
// de peticion que haremos
ajax({
    url,
    method: 'POST',
    headers: {
        'mi-token': 'ABC123'
    },
    body: {
        id: 1,
        nombre: 'Fernando'
    }
}).subscribe(console.log);
