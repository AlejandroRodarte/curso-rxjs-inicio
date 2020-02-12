import { of, fromEvent } from 'rxjs';
import { take, tap, first, map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>(document, 'click');

// first() = take(1)
// emite el primer valor y el observable se completa
// a first() se le puede pasar opcionalmente un predicado para que emita el primer
// valor que cumpla con esa condicion; emitido, se completa el observable
click$
    .pipe(
        tap(e => console.log('tap')),
        map(({ clientX, clientY }) => ({ clientX, clientY })),
        first(coordinates => coordinates.clientY >= 150)
    )
    .subscribe({
        next: coordinates => console.log('next: ', coordinates),
        complete: () => console.log('complete')
    });


