import { of, fromEvent, interval } from 'rxjs';
import { take, tap, first, map, takeWhile, takeUntil, skip } from 'rxjs/operators';

const button = document.createElement('button');

button.innerHTML = 'Detener Timer';

document.querySelector('body').append(button);

const counter$ = interval(1000);

// const click$ = fromEvent<MouseEvent>(button, 'click');

// skip: no emite las primeras n secuencias de datos
// operadores antes de skip se siguen ejecutando si skip se dispara
// operadores despues de skip se ejecuta si skip no se dispara
const click$ = 
    fromEvent<MouseEvent>(button, 'click')
        .pipe(
            tap(() => console.log('antes de skip')),
            skip(1),
            tap(() => console.log('despues de skip')),
        );

// takeUntil: suscriptor recibira informacion de observable counter$ hasta
// que click$ emita informacion
counter$
    .pipe(
        takeUntil(click$)
    )
    .subscribe({
        next: val => console.log('next: ', val),
        complete: () => console.log('complete')
    });
