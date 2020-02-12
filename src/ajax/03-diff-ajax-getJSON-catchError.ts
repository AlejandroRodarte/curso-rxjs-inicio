import { ajax, AjaxError } from 'rxjs/ajax';
import { map, pluck, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

const url = 'https://httpbinxx.org/delay/1';

const manejaError = (err: AjaxError) => {

    console.warn('error: ', err.message);

    return of({
        ok: false,
        usuarios: []
    });

};

// diferencias entre getJSON y ajax
// getJSON solo contiene el cuerpo de la respuesta
// ajax contiene informacion adicional como el status code y cabeceras

// const obs$ = 
//     ajax
//         .getJSON(url, {
//             'Content-Type': 'application/json',
//             'Mi-Token': 'ABC123'
//         })
//         .pipe(
//             catchError(manejaError)
//         );

// const obs2$ = 
//     ajax(url)
//     .pipe(
//         catchError(manejaError)
//     );

const obs$ = ajax.getJSON(url);

const obs2$ = 
    ajax(url)
        .pipe(
            catchError(manejaError)
        );

// atrapando errores con `catchError` y `error` handler en suscripcion
// se dispara el `error` handler del subscribe pero tambien el `next` ya que la
// function inyectada a catchError retorna un observable con datos
obs$
    .pipe(
        catchError(manejaError)
    )
    .subscribe({
        next: data => console.log('getJSON: ', data),
        error: err => console.warn('error: ', err),
        complete: () => console.log('complete')
    });

// obs2$
//     .subscribe(data => console.log('ajax: ', data));