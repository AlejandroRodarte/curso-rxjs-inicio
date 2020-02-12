import { asyncScheduler, fromEvent } from 'rxjs';
import { debounceTime, map, tap, pluck, distinctUntilChanged, throttleTime, sampleTime } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>(document, 'click');

// sampleTime: emite el ultimo valor emitido en un intervalo de tiempo dado
// si no emite nada en ese intervalo, no se emite nada
// operadores anteriores se ejecutan: procura no tener operaciones que 
// consuman muchos recursos antes de sampleTime
click$
    .pipe(
        sampleTime(2000),
        map(({ x, y }) => ({ x, y })),
    )
    .subscribe(console.log);
