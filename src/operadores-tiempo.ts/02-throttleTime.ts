import { asyncScheduler, fromEvent } from 'rxjs';
import { debounceTime, map, tap, pluck, distinctUntilChanged, throttleTime } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

// throttleTime: emite inmediatamente y no volver a emitir durante un periodo de tiempo fijo (minimo)
// cuando el observable emita despues de ese tiempo, vuelve a emitir y la espera comienza de nuevo
click$
    .pipe(
        throttleTime(3000)
    )
    .subscribe(console.log);

const input = document.createElement('input');

document.querySelector('body').append(input);

// throttleTime configurado para que emita el primer y tambien el ultimo valor despues del intervalo
const input$ =
    fromEvent<KeyboardEvent>(input, 'keyup')
    .pipe(
        throttleTime(1000, asyncScheduler, {
            leading: true,
            trailing: true
        }),
        pluck<KeyboardEvent, string>('target', 'value'),
        distinctUntilChanged(),
        tap(() => console.log('enviando peticion http'))
    );

input$.subscribe(console.log);
