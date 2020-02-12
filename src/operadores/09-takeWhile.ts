import { of, fromEvent } from 'rxjs';
import { take, tap, first, map, takeWhile } from 'rxjs/operators';

interface Coordinates {
    x: number;
    y: number;
}

const click$ = fromEvent<MouseEvent>(document, 'click');

// takeWhile: recibir datos emitidos hasta que se cumpla cierta condicion (se completa observable)
// inclusive: true = se emite el dato que hizo que la condicion fallara
click$
    .pipe(
        map<MouseEvent, Coordinates>(({ x, y }) => ({ x, y })),
        takeWhile<Coordinates>(({ y }) => y <= 150, true)
    )
    .subscribe({
        next: val => console.log('next: ', val),
        complete: () => console.log('complete')
    });


