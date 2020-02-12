import { ajax, AjaxError } from 'rxjs/ajax';
import { map, pluck, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

const url = 'https://httpbin.org/delay/1';

// getJSON: permite obtener el cuerpo de la respuesta directamente
// tambien podemos setear cosas como headers
const obs$ = 
    ajax
        .getJSON(url, {
            'Content-Type': 'application/json',
            'Mi-Token': 'ABC123'
        });

obs$
    .subscribe(data => console.log('data: ', data));
