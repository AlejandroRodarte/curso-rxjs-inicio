import { fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const body = document.querySelector('body');

const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append(textInput, orderList);

const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

// problematica y necesidad de un operador de transformacion
// meta: suscribirnos a cambios en el valor del input y obtener la lista de usuarios
// de Github que coincidan con ese nombre
// requerimos realizar una peticion http para hacer esto
input$
    .pipe(
        debounceTime(500),
        map(event => {

            const text: string = event.target['value'];

            // ajax.getJSON devuelve un Observable, por lo que los suscriptores NO tendran
            // la informacion resuelta, sino un Observable
            // en otras palabras: este Observable retorna a su vez un Observable
            return ajax.getJSON(
                `https://api.github.com/users/${text}`
            );

        }),
        distinctUntilChanged()
    )
    .subscribe(

        // como el Observable input$ devuelve un Observable, podemos suscribirnos a el
        // y tenemos que usar operadores en este Observable para poder trabajar con el
        // los operadores de transformacion nos permiten evitar esta `anidacion de Observables`,
        // suscribiendonos al Observable anidado para obtener la respuesta que necesitamos e
        // introducirlas al flujo de informacion corriente
        obs$ => obs$
                    .pipe(
                        pluck('url')
                    )
                    .subscribe(console.log)

    );
