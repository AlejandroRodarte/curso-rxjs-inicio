import { of, fromEvent, interval } from 'rxjs';
import { take, tap, first, map, takeWhile, takeUntil } from 'rxjs/operators';

const button = document.createElement('button');

button.innerHTML = 'Detener Timer';

document.querySelector('body').append(button);

const counter$ = interval(1000);

const click$ = fromEvent<MouseEvent>(button, 'click');

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
