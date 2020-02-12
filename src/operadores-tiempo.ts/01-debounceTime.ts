import { fromEvent } from 'rxjs';
import { debounceTime, map, tap, pluck, distinctUntilChanged } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

// debounceTime: retrasa emision en un intervalo de tiempo, ignorando las rafagas de emisiones
// solo emitiendo aquella que fue la ultima en un periodo mayor al especificado en el operador
click$
    .pipe(
        debounceTime(3000)
    )
    .subscribe(console.log);

const input = document.createElement('input');

document.querySelector('body').append(input);

// utilidad: evitar el disparo de peticiones http cuando un usuario teclea algo
// es una barra de busqueda
const input$ =
    fromEvent<KeyboardEvent>(input, 'keyup')
    .pipe(
        debounceTime(1000),
        pluck<KeyboardEvent, string>('target', 'value'),
        distinctUntilChanged(),
        tap(() => console.log('enviando peticion http'))
    );

input$.subscribe(console.log);
